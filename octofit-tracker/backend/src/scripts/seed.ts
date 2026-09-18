import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Velocity Vets',
        sport: 'Cycling',
        city: 'Seattle',
      },
      {
        name: 'Summit Striders',
        sport: 'Running',
        city: 'Denver',
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Martinez',
        email: 'ava@example.com',
        fitnessLevel: 'Advanced',
        weeklyGoal: 6,
        teamId: teams[0]._id,
      },
      {
        name: 'Noah Kim',
        email: 'noah@example.com',
        fitnessLevel: 'Intermediate',
        weeklyGoal: 5,
        teamId: teams[1]._id,
      },
      {
        name: 'Sophia Chen',
        email: 'sophia@example.com',
        fitnessLevel: 'Beginner',
        weeklyGoal: 3,
        teamId: teams[0]._id,
      },
    ]);

    await Team.updateMany({}, { $set: { members: users.map((user) => user._id) } });

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Cycling',
        durationMinutes: 42,
        caloriesBurned: 520,
        date: new Date('2026-09-15T06:00:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 430,
        date: new Date('2026-09-16T07:30:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Strength',
        durationMinutes: 28,
        caloriesBurned: 260,
        date: new Date('2026-09-17T18:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        name: 'Ava Martinez',
        points: 980,
        team: 'Velocity Vets',
        streak: 12,
      },
      {
        userId: users[1]._id,
        name: 'Noah Kim',
        points: 920,
        team: 'Summit Striders',
        streak: 9,
      },
      {
        userId: users[2]._id,
        name: 'Sophia Chen',
        points: 760,
        team: 'Velocity Vets',
        streak: 4,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Power Interval Ride',
        focus: 'Cardio',
        difficulty: 'Intense',
        durationMinutes: 30,
        equipment: ['Bike', 'Heart rate monitor'],
        instructions: ['Warm up for 5 minutes', 'Do 10 rounds of 20-second sprints', 'Cool down with easy spinning'],
      },
      {
        title: 'Trail Strength Circuit',
        focus: 'Strength',
        difficulty: 'Moderate',
        durationMinutes: 40,
        equipment: ['Dumbbells', 'Bench'],
        instructions: ['Perform 3 rounds of squats, presses, and rows', 'Rest 60 seconds between rounds'],
      },
      {
        title: 'Recovery Mobility Flow',
        focus: 'Mobility',
        difficulty: 'Easy',
        durationMinutes: 20,
        equipment: ['Yoga mat'],
        instructions: ['Move through a 20-minute mobility sequence', 'Focus on hips, back, and shoulders'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
