import { Prisma } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  findWorkoutById,
  getAllWorkouts,
} from '../src/services/workout.service';
import prismaMock from '../src/client/__mocks__/prisma';

vi.mock('../src/client/prisma');

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2000, 1, 1, 13));
});

describe('testing workout.service', () => {
  it('should return all workouts', async () => {
    const mockWorkouts = [
      {
        id: 1,
        type: 'Running',
        date: new Date('2024-01-25T10:30:00.000Z'),
        distance: new Prisma.Decimal(12.12),
        duration: 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        type: 'Running',
        date: new Date('2024-01-25T10:30:00.000Z'),
        distance: new Prisma.Decimal(12.12),
        duration: 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.workout.findMany.mockResolvedValueOnce(mockWorkouts);
    const workouts = await getAllWorkouts();

    expect(workouts).toStrictEqual(mockWorkouts);
  });

  it('Should return a workout by id', async () => {
    const mockWorkouts = [
      {
        id: 1,
        type: 'Running',
        date: new Date('2024-01-25T10:30:00.000Z'),
        distance: new Prisma.Decimal(12.12),
        duration: 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        type: 'Running',
        date: new Date('2024-01-25T10:30:00.000Z'),
        distance: new Prisma.Decimal(12.12),
        duration: 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.workout.findUnique.mockResolvedValueOnce(mockWorkouts[0]);
    const workout = await findWorkoutById(1);

    expect(workout).toStrictEqual(mockWorkouts[0]);
  });

  it('should return the created workout', async () => {
    const newWorkout = {
      type: 'Running',
      date: new Date('2024-01-25T10:30:00.000Z'),
      distance: new Prisma.Decimal(12.12),
      duration: 3600,
    };
    const mockWorkout = {
      ...newWorkout,
      id: 1,
      date: new Date('2024-01-25T10:30:00.000Z'),
      distance: new Prisma.Decimal(12.12),
      duration: 3600,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.workout.create.mockResolvedValueOnce(mockWorkout);
    const workout = await addWorkout(newWorkout);

    expect(workout).toStrictEqual(mockWorkout);
  });

  it('should update workout by id', async () => {
    const mockWorkout = {
      type: 'Running',
      date: new Date('2024-01-25T10:30:00.000Z'),
      distance: new Prisma.Decimal(12.12),
      duration: 3600,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.workout.update.mockResolvedValueOnce({ ...mockWorkout, id: 2 });
    const workout = await editWorkout(2, mockWorkout);

    expect(workout).toStrictEqual({
      id: 2,
      type: 'Running',
      date: new Date('2024-01-25T10:30:00.000Z'),
      distance: new Prisma.Decimal(12.12),
      duration: 3600,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('should delete workout by id', async () => {
    const mockWorkout = {
      id: 1,
      type: 'Running',
      date: new Date('2024-01-25T10:30:00.000Z'),
      distance: new Prisma.Decimal(10.52),
      duration: 1800,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.workout.delete.mockResolvedValueOnce(mockWorkout);
    const deletedWorkout = await deleteWorkout(1);

    expect(deletedWorkout).toEqual(mockWorkout);
  });
});

afterAll(() => {
  vi.useRealTimers();
});
