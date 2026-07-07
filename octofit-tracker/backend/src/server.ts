import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', apiBaseUrl });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();
    res.json({ count: users.length, data: users, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();
    res.json({ count: users.length, data: users, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create({
      name: req.body.name || 'New User',
      email: req.body.email || 'new@example.com',
      role: req.body.role || 'member'
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ count: teams.length, data: teams, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ count: teams.length, data: teams, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.post('/api/teams', async (req: Request, res: Response) => {
  try {
    const newTeam = await Team.create({
      name: req.body.name || 'New Team',
      sport: req.body.sport || 'General Fitness',
      members: req.body.members || []
    });

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  try {
    const newTeam = await Team.create({
      name: req.body.name || 'New Team',
      sport: req.body.sport || 'General Fitness',
      members: req.body.members || []
    });

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ count: activities.length, data: activities, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ count: activities.length, data: activities, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities', async (req: Request, res: Response) => {
  try {
    const newActivity = await Activity.create({
      title: req.body.title || 'New Activity',
      type: req.body.type || 'general',
      durationMin: Number(req.body.durationMin || 0),
      completedAt: req.body.completedAt || new Date().toISOString()
    });

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  try {
    const newActivity = await Activity.create({
      title: req.body.title || 'New Activity',
      type: req.body.type || 'general',
      durationMin: Number(req.body.durationMin || 0),
      completedAt: req.body.completedAt || new Date().toISOString()
    });

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).lean();
    res.json({ count: leaderboard.length, data: leaderboard, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).lean();
    res.json({ count: leaderboard.length, data: leaderboard, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json({ count: workouts.length, data: workouts, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json({ count: workouts.length, data: workouts, apiBaseUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.post('/api/workouts', async (req: Request, res: Response) => {
  try {
    const newWorkout = await Workout.create({
      title: req.body.title || 'New Workout',
      focus: req.body.focus || 'general',
      durationMin: Number(req.body.durationMin || 0),
      difficulty: req.body.difficulty || 'beginner'
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  try {
    const newWorkout = await Workout.create({
      title: req.body.title || 'New Workout',
      focus: req.body.focus || 'general',
      durationMin: Number(req.body.durationMin || 0),
      difficulty: req.body.difficulty || 'beginner'
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();
