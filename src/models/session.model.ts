import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionInput {
  user: UserDocument['_id'];
  userAgent: string;
}

export interface SessionDocument extends SessionInput, mongoose.Document {
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  valid: {type: Boolean, default: true},
  userAgent: {type: String},
}, {
  timestamps: true,
});

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel
