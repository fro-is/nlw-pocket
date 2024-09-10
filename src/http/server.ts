import { env } from '@/config/env';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { createCompletionsRoute } from './routes/completions';
import { createGoalsRoute } from './routes/goals';

const PORT = Number(env.PORT) || 3333;
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: env.APP_URL,
});

app.register(createGoalsRoute, {
  prefix: 'goals',
});

app.register(createCompletionsRoute, {
  prefix: 'completions',
});

app.listen({ port: PORT }).then(() => {
  console.log('HTTP Server Running on PORT', PORT);
});
