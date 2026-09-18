import express from 'express';

const app = express();
const port = 8000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Octofit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`Octofit Tracker backend listening on port ${port}`);
});
