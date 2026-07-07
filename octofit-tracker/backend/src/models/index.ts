import mongoose, { type Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
}

export interface IActivity extends Document {
  title: string;
  type: string;
  durationMin: number;
  completedAt: string;
}

export interface ILeaderboardEntry extends Document {
  username: string;
  score: number;
  streak: number;
}

export interface IWorkout extends Document {
  title: string;
  focus: string;
  durationMin: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  role: { type: String, required: true, default: 'member' }
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  sport: { type: String, required: true, trim: true },
  members: { type: [String], default: [] }
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  durationMin: { type: Number, required: true },
  completedAt: { type: String, required: true }
}, { timestamps: true });

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  username: { type: String, required: true, unique: true, trim: true },
  score: { type: Number, required: true, default: 0 },
  streak: { type: Number, required: true, default: 0 }
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  focus: { type: String, required: true, trim: true },
  durationMin: { type: Number, required: true },
  difficulty: { type: String, required: true, trim: true }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
