import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
export const addWorkout = async (type: string, length: Prisma.Decimal, time: number) => {
  const workout = await prisma.workout.create({
    data: {
      type: type,
      length: new Prisma.Decimal(length),
      time: time,
    },
  });
  return workout;
};

// Edit workout function
export const editWorkout = async (
  id: number,
  type: string,
  length: Prisma.Decimal,
  time: number,
) => {
  const workout = await prisma.workout.update({
    where: {
      id: id,
    },
    data: { type: type, length: new Prisma.Decimal(length), time: time },
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
