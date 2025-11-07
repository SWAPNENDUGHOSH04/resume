import mongoose from "mongoose";
const connectDB =async () => {
    try{
        mongoose.connection.on("connected", ()=>{console.log("database connected succesfully")})
        let mongodbURI =process.env.MONGODB_URI;
        const projectName = "Resume"
        if(!mongodbURI){
            throw new Error("ENV var not set")
        }
        if(mongodbURI.endsWith('/')){
            mongodbURI = mongodbURI.slice(0,-1)
        }
        await mongoose.connect(`${mongodbURI}/${projectName}`)
    }catch(error){
        console.error("Error connecting to MongoDB", error)
    }
    
}

export default connectDB