import mongoose from "mongoose"

const connectDB= async()=>{

    try {
        
       await mongoose.connect(process.env.MONGODBATLAS_URL)
       console.log("db connected");
       
    } catch (error) {
        console.log("db error");
        
    }

}

export default connectDB