import mongoose, { Schema, model, type Model } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    weeklyGoal: { type: Number, default: 4 },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

export const TeamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const ActivitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const LeaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const WorkoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Intense'], default: 'Moderate' },
    durationMinutes: { type: Number, required: true },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
  },
  { timestamps: true }
);

export const User: Model<any> = mongoose.models.User || model('User', UserSchema);
export const Team: Model<any> = mongoose.models.Team || model('Team', TeamSchema);
export const Activity: Model<any> = mongoose.models.Activity || model('Activity', ActivitySchema);
export const LeaderboardEntry: Model<any> = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', LeaderboardEntrySchema);
export const Workout: Model<any> = mongoose.models.Workout || model('Workout', WorkoutSchema);
