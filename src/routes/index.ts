import { FastifyInstance } from "fastify";
import user from "./user";
import client from "./client";
import sale from "./sale";

export default async function routes(fastify: FastifyInstance) {
  await fastify.register(user, { prefix: "/user" });
  await fastify.register(client, { prefix: "/client" });
  await fastify.register(sale, { prefix: "/sale" });
}