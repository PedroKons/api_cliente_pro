import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import 'dotenv/config';
import { CreateClientRequest, UpdateClientRequest } from "../types/type_client_request";
import fastifyJwt from "@fastify/jwt";

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

    // Rota para listar Clientes por marca
    fastify.get('/list/:brandId', {
        preHandler: async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    }, async (request, reply) => {
        try {
            const { brandId } = request.params as { brandId: string };
            const { page = 1, limit = 10 } = request.query as { page?: number; limit?: number };

            // Validações básicas
            if (!brandId) {
                return reply.status(400).send({ 
                    error: 'Brand ID é obrigatório' 
                });
            }

            const skip = (page - 1) * limit;

            // Buscar clientes da marca com paginação
            const [clients, total] = await Promise.all([
                prisma.client.findMany({
                    where: { brand_id: brandId },
                    include: {
                        address: true,
                        brand: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.client.count({
                    where: { brand_id: brandId }
                })
            ]);

            return reply.status(200).send({
                message: 'Clientes listados com sucesso',
                clients,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            });

        } catch (error) {
            fastify.log.error(error);
            
            return reply.status(500).send({ 
                error: 'Erro interno do servidor' 
            });
        }
    });

    // Rota para atualizar cliente por id
    fastify.put('/update/:clientId', {
        preHandler: async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    }, async (request, reply) => {
        try {
            const { clientId } = request.params as { clientId: string };
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
            } = request.body as UpdateClientRequest;

            // Validações básicas
            if (!clientId) {
                return reply.status(400).send({ 
                    error: 'Client ID é obrigatório' 
                });
            }

            // Verificar se o cliente existe
            const existingClient = await prisma.client.findUnique({
                where: { id: clientId },
                include: { address: true }
            });

            if (!existingClient) {
                return reply.status(404).send({ 
                    error: 'Cliente não encontrado' 
                });
            }

            // Verificar se o email já existe (se fornecido e diferente do atual)
            if (email && email !== existingClient.email) {
                const emailExists = await prisma.client.findFirst({
                    where: { 
                        email,
                        NOT: { id: clientId }
                    }
                });

                if (emailExists) {
                    return reply.status(409).send({ 
                        error: 'Email já está em uso por outro cliente' 
                    });
                }
            }

            // Atualizar endereço se fornecido
            if (address) {
                await prisma.address.update({
                    where: { id: existingClient.address_id },
                    data: {
                        street: address.street ?? existingClient.address.street,
                        number: address.number ?? existingClient.address.number,
                        complement: address.complement ?? existingClient.address.complement,
                        neighborhood: address.neighborhood ?? existingClient.address.neighborhood,
                        city: address.city ?? existingClient.address.city,
                        state: address.state ?? existingClient.address.state,
                        zip_code: address.zipCode ?? existingClient.address.zip_code,
                        country: address.country ?? existingClient.address.country
                    }
                });
            }

            // Atualizar cliente
            const updatedClient = await prisma.client.update({
                where: { id: clientId },
                data: {
                    brand_id: brandId ?? existingClient.brand_id,
                    client_type: clientType ?? existingClient.client_type,
                    full_name: fullName ?? existingClient.full_name,
                    date_of_birth: dateOfBirth ? new Date(dateOfBirth) : existingClient.date_of_birth,
                    email: email ?? existingClient.email,
                    phone: phone ?? existingClient.phone,
                    cpf: cpf ?? existingClient.cpf,
                    company_name: companyName ?? existingClient.company_name,
                    fantasy_name: fantasyName ?? existingClient.fantasy_name,
                    cnpj: cnpj ?? existingClient.cnpj,
                    state_registration: stateRegistration ?? existingClient.state_registration,
                    state_membership: stateRegistration ?? existingClient.state_membership,
                    telephone: telephone ?? existingClient.telephone,
                    enterprise_type: enterpriseType ?? existingClient.enterprise_type,
                    observations: observations ?? existingClient.observations
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

            return reply.status(200).send({
                message: 'Cliente atualizado com sucesso',
                client: updatedClient
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

    // Rota para deletar cliente por id
    fastify.delete('/delete/:clientId', {
        preHandler: async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    }, async (request, reply) => {
        try {
            const { clientId } = request.params as { clientId: string };

            // Validações básicas
            if (!clientId) {
                return reply.status(400).send({ 
                    error: 'Client ID é obrigatório' 
                });
            }

            // Verificar se o cliente existe
            const existingClient = await prisma.client.findUnique({
                where: { id: clientId },
                include: { 
                    address: true,
                    sales: true
                }
            });

            if (!existingClient) {
                return reply.status(404).send({ 
                    error: 'Cliente não encontrado' 
                });
            }

            // Verificar se o cliente tem vendas associadas
            if (existingClient.sales.length > 0) {
                return reply.status(400).send({ 
                    error: 'Não é possível deletar cliente que possui vendas associadas' 
                });
            }

            // Deletar cliente (o endereço será deletado automaticamente devido ao relacionamento)
            await prisma.client.delete({
                where: { id: clientId }
            });

            // Deletar endereço órfão
            await prisma.address.delete({
                where: { id: existingClient.address_id }
            });

            return reply.status(200).send({
                message: 'Cliente deletado com sucesso'
            });

        } catch (error) {
            fastify.log.error(error);
            
            return reply.status(500).send({ 
                error: 'Erro interno do servidor' 
            });
        }
    });
}