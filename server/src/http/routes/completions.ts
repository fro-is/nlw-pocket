import { createGoalCompletion } from '@/functions/create-goal-completion';
import { deleteGoalCompletion } from '@/functions/delete-goal-completion';
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

  app.delete(
    '/:goalCompletionId',
    {
      schema: {
        params: z.object({
          goalCompletionId: z.coerce.number(),
        }),
      },
    },
    async req => {
      const { goalCompletionId } = req.params;

      await deleteGoalCompletion(goalCompletionId);

      return {
        statusCode: 200,
      };
    }
  );
};
