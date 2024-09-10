import { createGoal } from '@/functions/create-goal';
import { createGoalCompletion } from '@/functions/create-goal-completion';
import { getWeekPendingGoals } from '@/functions/get-week-pending-goals';
import fastify from 'fastify';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import z from 'zod';

const PORT: number = Number.parseInt(process.env.PORT || '3333');
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
  '/goals',
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

app.get('/goals/pending', async () => {
  const { pendingGoals } = await getWeekPendingGoals();

  return {
    statusCode: 200,
    data: pendingGoals,
  };
});

app.post(
  '/completions',
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

app.listen({ port: PORT }).then(() => {
  console.log('HTTP Server Running on PORT', PORT);
});
