import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'

// configs
const app = express();
dotenv.config();

const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

//middleware
app.use(cors());
// allows you to access backend from any IP address 'cors()'
app.use(express.json());



//API ENDPONTS
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)

app.get('/', (req,res)=>{
    res.send('Hello Reuben')
})

app.listen(port, (req,res)=>{
    console.log(`server running on port ${port}`)
})
