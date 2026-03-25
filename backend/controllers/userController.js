import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import validator from 'validator'


// creating user token using user 'id'
const createToken =  (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
    
}




//Route for userRegister
 const registerUser = async (req,res) => {
    try {
        const {name,email,password}= req.body;
        //user already exist
        const exists = await userModel.findOne({email})
        if(exists){
           return res.json({
                success: false,
                message:'User already exist'
            })
        };
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message:'Please enter a valid email'
            })

        };
        if(password.length < 8){
            return res.json({
                success: false,
                message:'Please enter a strong password'
            })

        };

        // Hashing user password

        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const newUser = new userModel({
            name,
            password: hashedPassword,
            email
        });

       const user = await newUser.save();
       // create token for the new user
       const token = createToken(user._id)
        res.status(200).json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    };    
};

//Route for userLogin
 const loginUser = async (req,res) => {
   try {
    const {email, password}= req.body;
    // when the user is available

    const user = await userModel.findOne({email})
    // when user is not available
    if(!user){
        return res.json({
            success: false,
            message: 'User does not exist'
        });
    };
    // match user password when he is available, 'user.password' is the saved password in DB

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
        const token =createToken(user._id);
        res.json({success:true, token})
    }else {
        res.json({
            success: false, message: 'Invalid Credentials'
        })
    }

    
   } catch (error) {
    console.log(error);
        res.json({success:false, message: error.message})
   }
    
};
//Route for adminLogin
 const adminLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
            res.json({success : true, token});
        }else {
            res.json({success : false, message : 'INVALID CREDENTIALS'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
        
    }

    
}

export  {loginUser, registerUser, adminLogin}