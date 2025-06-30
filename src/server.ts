import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import routes from "./routes";
import 'dotenv/config';

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is required');
  process.exit(1);
}

const fastify = Fastify({
  logger: true,
});

await fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET
});

await fastify.register(routes);

fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
