import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  const _user = this as UserDocument;
  if (!_user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hashSync(_user.password, salt);

  _user.password = hash;

  return next()
});

userSchema.methods.isValidPassword = async function (password: string) {
  const _user = this as UserDocument;
  try {
    return await bcrypt.compare(password, _user.password);
  } catch (error) {
    return false
  }
}

const User = mongoose.model<UserDocument>('User', userSchema);

export default User
