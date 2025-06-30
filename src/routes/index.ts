import { FastifyInstance } from "fastify";
import user from "./user";

export default async function routes(fastify: FastifyInstance) {
  await fastify.register(user, { prefix: "/user" });
}