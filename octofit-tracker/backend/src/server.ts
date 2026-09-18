import express from 'express';
import cors from 'cors';
import db from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options(/.*/, cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Octofit Tracker API is running',
    apiBaseUrl,
    database: db.name || 'octofit_db',
  });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().populate('teamId');
  res.json({ resource: 'users', data: users });
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ resource: 'users', created: true, data: user });
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json({ resource: 'teams', data: teams });
});

app.post('/api/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ resource: 'teams', created: true, data: team });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('userId');
  res.json({ resource: 'activities', data: activities });
});

app.post('/api/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ resource: 'activities', created: true, data: activity });
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ points: -1 });
  res.json({ resource: 'leaderboard', data: leaderboard });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find();
  res.json({ resource: 'workouts', data: workouts });
});

app.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ resource: 'workouts', created: true, data: workout });
});

app.listen(port, () => {
  console.log(`Octofit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
