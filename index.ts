import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes  from './routes';
import swagger from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MongoDB URI is not provided.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use('/api', routes );
app.use(swagger);