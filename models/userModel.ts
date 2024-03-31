import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<User>('User', UserSchema);