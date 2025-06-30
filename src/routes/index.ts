import { FastifyInstance } from "fastify";
import hello from "./hello";
import user from "./user";

export default async function routes(fastify: FastifyInstance) {
  await fastify.register(hello, { prefix: "/hello" });
  await fastify.register(user, { prefix: "/user" });
}