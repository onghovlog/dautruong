import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://thayhoweb_db_user:Tuong29042011@cluster0.uafqmya.mongodb.net/dautruongngonngu?retryWrites=true&w=majority';

let isConnecting = null;

/**
 * Kết nối cơ sở dữ liệu MongoDB Atlas
 */
export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return await isConnecting;
  }

  try {
    isConnecting = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      autoIndex: true
    });

    const conn = await isConnecting;
    console.log(`[MongoDB] Kết nối MongoDB Atlas thành công: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('[MongoDB Error] Không thể kết nối MongoDB Atlas:', error.message);
    throw error;
  } finally {
    isConnecting = null;
  }
}

/**
 * Ngắt kết nối MongoDB
 */
export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('[MongoDB] Đã ngắt kết nối MongoDB.');
  }
}
