import { FastifyInstance } from "fastify";
import hello from "./hello";

export default async function routes(fastify: FastifyInstance) {
  await fastify.register(hello, { prefix: "/hello" });
}