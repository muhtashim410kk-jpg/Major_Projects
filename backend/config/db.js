import mongoose from "mongoose"

const connectDB= async(){

    try {
        
       await mongoose.connect(process.env.MONGODBATLAS_URL)

    } catch (error) {
        
    }

}