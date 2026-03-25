import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'
import userModel from '../models/userModel.js'
import dotenv from 'dotenv';
dotenv.config();



//global Variable. use currency symbol in your location
//'dummy payment stripe' generates dummy digits. click payment by country, choose US
const currency = 'usd'
const deliveryCharge = 10


//gateway initialize Stripe
const stripe =  Stripe( process.env.STRIPE_SECRET_KEY)


// Placing Orders by Cash On Delivery(COD) method
const placeOrder = async (req,res) => {
    try {
        const {userId,items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
             amount,
             paymentMethod: 'COD',
             payment: false,
             date: Date.now(),
              address};

              const newOrder = new orderModel(orderData);
              await newOrder.save();
              //create cartData of userId and clear cartData by setting it : {cartData : {}}
              await orderModel.findByIdAndUpdate(userId, {cartData : {}});
              res.json({success: true, message: 'Order Placed'})
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
        
    }
    
}
// Placing Orders by STRIPE method
const placeOrderStripe = async (req,res) => {
    try {
        const {userId,items, amount, address} = req.body;
        //get 'originUrl ' from where user has initiated the payment. it also includes frontend url
        const {origin} = req.headers;
        // create orderData
        const orderData = {
            userId,
            items,
             amount,
             paymentMethod: 'Stripe',
             payment: false,
             date: Date.now(),
              address};

              const newOrder = new orderModel(orderData);
              await newOrder.save();

              //create 'line/live item' which is what we can use to execute Stripe payment

              const line_items = items.map((item)=>({
                price_data : {
                    currency : currency,
                    product_data : {
                       name : item.name
                    },
                    unit_amount : item.price * 100
                },
                    quantity : item.quantity
              }));
        // add delivery charges
              line_items.push({
                price_data : {
                    currency : currency,
                    product_data : {
                       name : 'Delivery Charges'
                    },
                    unit_amount : deliveryCharge * 100
                },
                    quantity : 1

              });
              // create a new session with the line_items

              const session = await stripe.checkout.sessions.create({
                //create the success_url  and cancel_url
                success_url : `${origin}/verify? success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify? success=false&orderId=${newOrder._id}`,
                line_items,
                mode : 'payment',
              });
              res.json({success : true, session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
        
    }
    
};

//Verify STRIPE

const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body;
    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment : true});
            //create cartData of the user
            await userModel.findByIdAndUpdate(userId, {cartData : {}})
            res.json({success: true})
        }else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false})
        }
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
};
// Placing Orders by RAZORPAY method
//const placeOrderRazorpay = async (req,res) => {   
//};

//All Orders Data For Admin Panel
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders})
        
    } catch (error) {
         console.log(error);
        res.json({success: false, message: error.message})
        
    }
    
}
//User Orders Data For Frontend
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success : true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
    
};
//Update Orders Status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success:true, message: 'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
    
};



export {allOrders, placeOrder,  placeOrderStripe,userOrders, updateStatus, verifyStripe}