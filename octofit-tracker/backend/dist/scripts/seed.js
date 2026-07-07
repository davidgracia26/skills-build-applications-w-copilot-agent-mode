"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({})
        ]);
        const users = await models_1.User.insertMany([
            { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'admin' },
            { name: 'Liam Patel', email: 'liam.patel@example.com', role: 'member' },
            { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'member' }
        ]);
        const teams = await models_1.Team.insertMany([
            {
                name: 'Trail Blazers',
                sport: 'Running',
                members: [users[0].id, users[1].id]
            },
            {
                name: 'Strength Squad',
                sport: 'CrossFit',
                members: [users[2].id]
            }
        ]);
        await models_1.Activity.insertMany([
            {
                title: 'Morning Run',
                type: 'cardio',
                durationMin: 30,
                completedAt: '2026-07-07T06:30:00.000Z'
            },
            {
                title: 'Upper Body Lift',
                type: 'strength',
                durationMin: 45,
                completedAt: '2026-07-07T18:00:00.000Z'
            },
            {
                title: 'Mobility Flow',
                type: 'mobility',
                durationMin: 20,
                completedAt: '2026-07-08T07:15:00.000Z'
            }
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { username: 'ava', score: 980, streak: 7 },
            { username: 'liam', score: 912, streak: 4 },
            { username: 'mina', score: 945, streak: 5 }
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Tempo Intervals',
                focus: 'endurance',
                durationMin: 25,
                difficulty: 'intermediate'
            },
            {
                title: 'Core Blast',
                focus: 'core',
                durationMin: 20,
                difficulty: 'beginner'
            },
            {
                title: 'Power Circuit',
                focus: 'strength',
                durationMin: 35,
                difficulty: 'advanced'
            }
        ]);
        console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
