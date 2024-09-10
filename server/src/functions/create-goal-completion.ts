import { db } from '@/db';
import { goalCompletions, goals } from '@/db/schema';
import dayjs from 'dayjs';
import { and, asc, count, eq, gte, lte, sql } from 'drizzle-orm';

interface CreateGoalCompletionDTO {
  goalId: number;
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionDTO) {
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

  const goalCompletionCount = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          eq(goalCompletions.goalId, goalId),
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  );

  const [goal] = await db
    .with(goalCompletionCount)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount:
        sql`COALESCE(${goalCompletionCount.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(goalCompletionCount, eq(goalCompletionCount.goalId, goals.id))
    .where(eq(goals.id, goalId));

  if (goal.completionCount >= goal.desiredWeeklyFrequency) {
    throw new Error('Goal already completed this week.');
  }

  const [goalCompletion] = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning();

  return {
    goalCompletion: {
      ...goalCompletion,
      goalDesiredWeeklyFrequency: goal.desiredWeeklyFrequency,
      goalCompletionCount: goal.completionCount + 1,
    },
  };
}
