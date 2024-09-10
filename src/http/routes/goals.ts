import { createGoal } from '@/functions/create-goal';
import { getWeekPendingGoals } from '@/functions/get-week-pending-goals';
import { getWeekSumary } from '@/functions/get-week-summary';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const createGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async req => {
      const { title, desiredWeeklyFrequency } = req.body;

      const goal = await createGoal({
        title,
        desiredWeeklyFrequency,
      });

      return {
        statusCode: 200,
        data: goal,
      };
    }
  );

  app.get('/pending', async () => {
    const { pendingGoals } = await getWeekPendingGoals();

    return {
      statusCode: 200,
      data: pendingGoals,
    };
  });

  app.get('/summary', async () => {
    const weekSummary = await getWeekSumary();
    return {
      statusCode: 200,
      data: weekSummary,
    };
  });
};
