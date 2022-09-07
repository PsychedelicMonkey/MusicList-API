import mongoose from 'mongoose';
import logger from '../utils/logger';
import { MONGO_URI } from '../utils/secrets';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    logger.debug(`MongoDB connected: ${conn.connection.host}`);
  } catch (err: any) {
    logger.error(new Error(err).message);
    process.exit(1);
  }
};

export default connectDB;
