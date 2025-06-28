import { FastifyInstance } from "fastify";

export default async function hello(fastify: FastifyInstance) {
    fastify.get("/", (request, reply) => {
        return { hello: "world" };
    });

    fastify.get("/:name", (request, reply) => {
        const { name } = request.params as { name: string };
        return { hello: name };
    });
}