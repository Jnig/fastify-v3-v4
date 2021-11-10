import fastify from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const server = fastify();

const querystring = Type.Object({
  x: Type.Number(),
  y: Type.Number(),
});

type queryType = Static<typeof querystring>;

const response = {
  200: Type.Object({
    result: Type.Number(),
  }),
};

server.get<{ Querystring: queryType }>(
  '/ping',
  {
    schema: {
      querystring,
      response,
    },
  },
  async (request, reply) => {
    const { x, y } = request.query;
    return reply.status(200).send({ result: x + y });
  },
);

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
