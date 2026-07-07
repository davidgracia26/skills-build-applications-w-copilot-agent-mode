"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running', apiBaseUrl });
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await models_1.User.find({}).lean();
        res.json({ count: users.length, data: users, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await models_1.User.find({}).lean();
        res.json({ count: users.length, data: users, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.post('/api/users', async (req, res) => {
    try {
        const newUser = await models_1.User.create({
            name: req.body.name || 'New User',
            email: req.body.email || 'new@example.com',
            role: req.body.role || 'member'
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
app.get('/api/teams', async (_req, res) => {
    try {
        const teams = await models_1.Team.find({}).lean();
        res.json({ count: teams.length, data: teams, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await models_1.Team.find({}).lean();
        res.json({ count: teams.length, data: teams, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
app.post('/api/teams', async (req, res) => {
    try {
        const newTeam = await models_1.Team.create({
            name: req.body.name || 'New Team',
            sport: req.body.sport || 'General Fitness',
            members: req.body.members || []
        });
        res.status(201).json(newTeam);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
app.post('/api/teams/', async (req, res) => {
    try {
        const newTeam = await models_1.Team.create({
            name: req.body.name || 'New Team',
            sport: req.body.sport || 'General Fitness',
            members: req.body.members || []
        });
        res.status(201).json(newTeam);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const activities = await models_1.Activity.find({}).lean();
        res.json({ count: activities.length, data: activities, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await models_1.Activity.find({}).lean();
        res.json({ count: activities.length, data: activities, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
app.post('/api/activities', async (req, res) => {
    try {
        const newActivity = await models_1.Activity.create({
            title: req.body.title || 'New Activity',
            type: req.body.type || 'general',
            durationMin: Number(req.body.durationMin || 0),
            completedAt: req.body.completedAt || new Date().toISOString()
        });
        res.status(201).json(newActivity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
app.post('/api/activities/', async (req, res) => {
    try {
        const newActivity = await models_1.Activity.create({
            title: req.body.title || 'New Activity',
            type: req.body.type || 'general',
            durationMin: Number(req.body.durationMin || 0),
            completedAt: req.body.completedAt || new Date().toISOString()
        });
        res.status(201).json(newActivity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
app.get('/api/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find({}).lean();
        res.json({ count: leaderboard.length, data: leaderboard, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find({}).lean();
        res.json({ count: leaderboard.length, data: leaderboard, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
app.get('/api/workouts', async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find({}).lean();
        res.json({ count: workouts.length, data: workouts, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find({}).lean();
        res.json({ count: workouts.length, data: workouts, apiBaseUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
app.post('/api/workouts', async (req, res) => {
    try {
        const newWorkout = await models_1.Workout.create({
            title: req.body.title || 'New Workout',
            focus: req.body.focus || 'general',
            durationMin: Number(req.body.durationMin || 0),
            difficulty: req.body.difficulty || 'beginner'
        });
        res.status(201).json(newWorkout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const newWorkout = await models_1.Workout.create({
            title: req.body.title || 'New Workout',
            focus: req.body.focus || 'general',
            durationMin: Number(req.body.durationMin || 0),
            difficulty: req.body.difficulty || 'beginner'
        });
        res.status(201).json(newWorkout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
startServer();
