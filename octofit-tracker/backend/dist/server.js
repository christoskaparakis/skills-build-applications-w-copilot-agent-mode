"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.options(/.*/, (0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'Octofit Tracker API is running',
        apiBaseUrl,
        database: database_1.default.name || 'octofit_db',
    });
});
app.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find().populate('teamId');
    res.json({ resource: 'users', data: users });
});
app.post('/api/users', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json({ resource: 'users', created: true, data: user });
});
app.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find().populate('members');
    res.json({ resource: 'teams', data: teams });
});
app.post('/api/teams', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json({ resource: 'teams', created: true, data: team });
});
app.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('userId');
    res.json({ resource: 'activities', data: activities });
});
app.post('/api/activities', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json({ resource: 'activities', created: true, data: activity });
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().sort({ points: -1 });
    res.json({ resource: 'leaderboard', data: leaderboard });
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find();
    res.json({ resource: 'workouts', data: workouts });
});
app.post('/api/workouts', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json({ resource: 'workouts', created: true, data: workout });
});
app.listen(port, () => {
    console.log(`Octofit Tracker backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
