import { db } from '@/db';
import { goalCompletions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function deleteGoalCompletion(goalCompletionId: number) {
  await db.delete(goalCompletions).where(eq(goalCompletions.id, goalCompletionId));
}
