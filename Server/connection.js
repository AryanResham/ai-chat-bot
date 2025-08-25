import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected\n Connection info:\n${mongoose.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;
