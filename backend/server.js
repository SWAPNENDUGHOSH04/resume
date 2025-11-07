import express from "express";
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import UserRouter from "./routes/UserRoutes.js"
import resumeRouter from "./routes/resumeRoutes.js";

const app = express()

const PORT = process.env.PORT || 3000;


//database conn
await connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', (req,res)=>res.send("Server is Live"))
app.use('/api/users', UserRouter)
app.use('/api/resumes', resumeRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})