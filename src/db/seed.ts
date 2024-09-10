import dayjs from 'dayjs';
import { closeConnection, db } from '.';
import { goalCompletions, goals } from './schema';

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const insertedGoals = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 3 },
    ])
    .returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(goalCompletions).values([
    { goalId: insertedGoals[0].id, createdAt: startOfWeek.toDate() },
    {
      goalId: insertedGoals[0].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
    {
      goalId: insertedGoals[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ]);
}

seed().finally(() => {
  closeConnection();
});
