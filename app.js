import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv'
config()
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import errorMiddeleware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js'


const app=express();

// Basi configuration
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL,
}))

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))



     app.get('/',(req,res)=>{
    res.send('Hello world')
    })
    app.use('/ping',(req,res)=>{
        res.send('pong')
        })
        
        // User related routes  
        app.use('/api/v1/user',userRoutes)
        // course related routes  
        app.use('/api/v1/course',courseRoutes)
        // payments related routes  
        app.use('/api/v1/payments',paymentRoutes)
        // miss routes related routes  
        app.use('/api/v1', miscRoutes);

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Page Not found')
})

app.use(errorMiddeleware);


export default app