import fastify from 'fastify';

const PORT: number = Number.parseInt(process.env.PORT || '3333');
const app = fastify();

app.listen({ port: PORT }).then(() => {
  console.log('HTTP Server Running on PORT', PORT);
});
