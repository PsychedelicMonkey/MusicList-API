import app from './app';
import connectDB from './config/db';
import logger from './utils/logger';

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.debug(`Server running on port ${PORT}`));
