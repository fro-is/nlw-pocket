import { createGoalCompletion } from '@/functions/create-goal-completion';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const createCompletionsRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/',
    {
      schema: {
        body: z.object({
          goalId: z.number(),
        }),
      },
    },
    async req => {
      const { goalId } = req.body;

      const completion = await createGoalCompletion({ goalId });

      return {
        statusCode: 200,
        data: completion,
      };
    }
  );
};
