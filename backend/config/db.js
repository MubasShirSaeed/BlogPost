import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MOGNO_URI)
        console.log(`Database connected: ${conn.connection.host} `);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        
    }
}


export default connectDB;