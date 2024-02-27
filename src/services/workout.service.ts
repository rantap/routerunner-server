import { Prisma } from '@prisma/client';
import prisma from '../client/prisma';

// Get all workouts function
export const getAllWorkouts = async () => {
  const workouts = await prisma.workout.findMany();
  return workouts;
};

// Get paginated workouts function
export const getPaginatedWorkouts = async (currentPageNumber: number, resultsPerPage: number) => {
  // Prisma doesn't automatically return the total count of items, hence two queries -- not very efficient
  // According to the GitHub repo issues page they're working on the matter, so check on this again later
  const [workouts, count] = await prisma.$transaction([
    prisma.workout.findMany({
      skip: resultsPerPage * (currentPageNumber - 1),
      take: resultsPerPage,
      orderBy: {
        date: 'desc',
      },
    }),
    prisma.workout.count(),
  ]);
  const numOfPages = Math.ceil(count / resultsPerPage);
  const hasMorePages = count > resultsPerPage * currentPageNumber;

  return {
    numOfPages: numOfPages,
    hasMorePages: hasMorePages,
    workouts: workouts,
  };
};

// Get total calculations for workouts between given dates
export const getTotals = async (startDate: string, endDate: string) => {
  const totals = await prisma.workout.groupBy({
    by: ['type'],
    where: {
      date: {
        lte: new Date(endDate).toISOString(),
        gte: new Date(startDate).toISOString(),
      },
    },
    _count: {
      type: true,
    },
    _sum: {
      distance: true,
      duration: true,
    },
    orderBy: {
      _count: {
        type: 'desc',
      },
    },
  });
  return totals;
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
