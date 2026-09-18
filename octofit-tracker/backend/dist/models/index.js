"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = exports.WorkoutSchema = exports.LeaderboardEntrySchema = exports.ActivitySchema = exports.TeamSchema = exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    weeklyGoal: { type: Number, default: 4 },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
}, { timestamps: true });
exports.TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
exports.ActivitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
exports.LeaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
exports.WorkoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Intense'], default: 'Moderate' },
    durationMinutes: { type: Number, required: true },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
}, { timestamps: true });
exports.User = mongoose_1.default.models.User || (0, mongoose_1.model)('User', exports.UserSchema);
exports.Team = mongoose_1.default.models.Team || (0, mongoose_1.model)('Team', exports.TeamSchema);
exports.Activity = mongoose_1.default.models.Activity || (0, mongoose_1.model)('Activity', exports.ActivitySchema);
exports.LeaderboardEntry = mongoose_1.default.models.LeaderboardEntry || (0, mongoose_1.model)('LeaderboardEntry', exports.LeaderboardEntrySchema);
exports.Workout = mongoose_1.default.models.Workout || (0, mongoose_1.model)('Workout', exports.WorkoutSchema);
