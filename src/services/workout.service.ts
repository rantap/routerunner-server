import { Prisma } from '@prisma/client';
import prisma from '../client/prisma';

// Get all workouts function
export const getAllWorkouts = async () => {
  const workouts = await prisma.workout.findMany();
  return workouts;
};

// Get workout by id function
export const findWorkoutById = async (id: number) => {
  const workout = await prisma.workout.findUnique({
    where: {
      id: id,
    },
  });
  return workout;
};

// Add workout function
export const addWorkout = async (newWorkout: Prisma.WorkoutCreateInput) => {
  const workout = await prisma.workout.create({
    data: newWorkout,
  });
  return workout;
};

// Edit workout function
export const editWorkout = async (id: number, newWorkout: Prisma.WorkoutUpdateInput) => {
  const workout = await prisma.workout.update({
    where: {
      id: id,
    },
    data: {
      type: newWorkout.type,
      date: newWorkout.date,
      distance: newWorkout.distance,
      duration: newWorkout.duration,
    },
  });
  return workout;
};

// Delete workout function
export const deleteWorkout = async (id: number) => {
  const workout = await prisma.workout.delete({
    where: {
      id: Number(id),
    },
  });
  return workout;
};
