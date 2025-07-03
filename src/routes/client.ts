import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import 'dotenv/config';
import { CreateClientRequest } from "../types/type_client_request";

export default async function client(fastify: FastifyInstance) {
    // Rota para criar cliente
    fastify.post('/create', {
        preHandler: async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    }, async (request, reply) => {
        try {
            const { 
                brandId, 
                clientType, 
                fullName, 
                dateOfBirth, 
                email, 
                phone, 
                cpf, 
                companyName, 
                fantasyName, 
                cnpj, 
                stateRegistration, 
                address, 
                telephone, 
                enterpriseType, 
                observations 
            } = request.body as CreateClientRequest;

            // Validações básicas
            if (!brandId || !clientType || !fullName || !dateOfBirth || !email || !phone || !address) {
                return reply.status(400).send({ 
                    error: 'Campos obrigatórios: brandId, clientType, fullName, dateOfBirth, email, phone, address' 
                });
            }

            // Verificar se o email já existe
            const existingClient = await prisma.client.findFirst({
                where: { email }
            });

            if (existingClient) {
                return reply.status(409).send({ 
                    error: 'Cliente com este email já existe' 
                });
            }

            // Criar endereço primeiro
            const createdAddress = await prisma.address.create({
                data: {
                    street: address.street,
                    number: address.number,
                    complement: address.complement || '',
                    neighborhood: address.neighborhood,
                    city: address.city,
                    state: address.state,
                    zip_code: address.zipCode,
                    country: address.country
                }
            });

            // Criar cliente
            const createdClient = await prisma.client.create({
                data: {
                    brand_id: brandId,
                    client_type: clientType,
                    full_name: fullName,
                    date_of_birth: new Date(dateOfBirth),
                    email,
                    phone,
                    cpf: cpf || '',
                    company_name: companyName || '',
                    fantasy_name: fantasyName || '',
                    cnpj: cnpj || '',
                    state_registration: stateRegistration || '',
                    state_membership: stateRegistration || '', // Assumindo que é o mesmo valor
                    address_id: createdAddress.id,
                    telephone: telephone || '',
                    enterprise_type: enterpriseType || '',
                    observations: observations || ''
                },
                include: {
                    address: true,
                    brand: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            return reply.status(201).send({
                message: 'Cliente criado com sucesso',
                client: createdClient
            });

        } catch (error) {
            fastify.log.error(error);
            
            // Se erro for relacionado ao Prisma
            if (error instanceof Error) {
                if (error.message.includes('Foreign key constraint failed')) {
                    return reply.status(400).send({ 
                        error: 'Brand ID fornecido não existe' 
                    });
                }
            }

            return reply.status(500).send({ 
                error: 'Erro interno do servidor' 
            });
        }
    });
}