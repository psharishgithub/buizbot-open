import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  googleId: string;  // Use googleId instead of userId
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    googleId: { type: String, required: true},
  });
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
