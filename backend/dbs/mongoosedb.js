import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connected to mongodb");
  
    }
    catch(error){
        console.log("Error connecting to mongodb",error.message);

    }
}

export default connectDB;
