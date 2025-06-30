import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import 'dotenv/config';
import fastifyJwt from "@fastify/jwt";
import { LoginRequest, RegisterRequest } from "../types/type_user_request";
import { hashPassword, comparePassword } from "../utils/auth";


export default async function user(fastify: FastifyInstance) {

    fastify.post('/register', async (request, reply) => {
        try {
            const { name, email, password, brand_id } = request.body as RegisterRequest;

            // Verifica se o usuário já existe
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return reply.status(400).send({ message: 'Usuário já existe' });
            }

            // Cria o usuário
            const hashedPassword = await hashPassword(password);
            const newUser = await prisma.user.create({
                data: { name, email, password: hashedPassword, brand_id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    brand_id: true,
                }
            });

            return reply.status(201).send({ message: 'Usuário criado com sucesso', user: newUser });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ message: 'Erro ao criar usuário' });
        }
    });

    fastify.post('/login', async (request, reply) => {
        try {
            const { email, password } = request.body as LoginRequest;

            // Buscar usuário
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return reply.status(401).send({ message: 'Email ou senha inválidos' });
            }

            // Verificar senha
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return reply.status(401).send({ message: 'Email ou senha inválidos' });
            }

            // Gera o token JWT
            const token = fastify.jwt.sign({ 
                userId: user.id, 
                brand_id: user.brand_id, 
                email: user.email 
            }, 
            { expiresIn: '1h' }
            );

            return reply.status(200).send({ 
                message: 'Login realizado com sucesso', 
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    brand_id: user.brand_id
                }
            });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ message: 'Erro ao fazer login' });
        }
    });

}