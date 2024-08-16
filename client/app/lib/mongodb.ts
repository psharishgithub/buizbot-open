import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await mongoose.connect(MONGODB_URI);
  cachedClient = client;
  return client;
}
