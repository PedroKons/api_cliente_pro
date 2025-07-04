import { FastifyInstance } from "fastify";
import { CreateSaleRequest } from "../types/type_sale_request";
import fastifyJwt from "@fastify/jwt";
import { prisma } from "../lib/prisma";

export default async function sale(fastify: FastifyInstance) {
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
                clientId, 
                originSale, 
                seller, 
                saleValue, 
                paymentMethod, 
                parcelNumber, 
                product, 
                deliveryDate, 
                responsibleForInstallation, 
                observationsTechnical, 
                warrantyTime, 
                statusSale, 
                calledTechnical, 
                observations 
            } = request.body as CreateSaleRequest;

            if  (!brandId || !clientId || !saleValue || !paymentMethod || !responsibleForInstallation) {
                return reply.status(400).send({
                    error: 'Campos obrigatórios: brandId, clientId, saleValue, paymentMethod, responsibleForInstallation'
                });
            }

            const existingClient = await prisma.client.findUnique({
                where: {
                    id: clientId
                }
            });

            if (!existingClient) {
                return reply.status(404).send({
                    error: 'Cliente não encontrado'
                });
            }

            const createdProduct = await prisma.product.create({
                data: {
                    brand_id: product.brandId,
                    type_of_cold_storage: product.typeOfColdStorage || '',
                    dimentions: product.dimentions || '',
                    capacity: product.capacity || 0,
                    observations: product.observations || ''
                }
            });

            const createdSale = await prisma.sale.create({
                data: {
                    brand_id: brandId,
                    client_id: clientId,
                    origin_sale: originSale || '',
                    seller: seller || '',
                    sale_value: saleValue,
                    payment_method: paymentMethod,
                    parcel_number: parcelNumber || 0,
                    products_id: createdProduct.id,
                    delivery_date: deliveryDate ? new Date(deliveryDate) : new Date(),
                    responsible_for_installation: responsibleForInstallation,
                    warranty_time: warrantyTime || 0,
                    status_sale: statusSale || '',
                    called_technical: calledTechnical || '',
                    observations: observations || '',
                    obvervations_technical: observationsTechnical || '',
                },
                include: {
                    client: true,
                    products: true,
                    brand: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            return reply.status(201).send({
                message: 'Venda criada com sucesso',
                sale: createdSale
            });
        } catch (err) {
            fastify.log.error(err);

            if (err instanceof Error) {
                if (err.message.includes('Foreign key constraint failed')) {
                    return reply.status(400).send({
                        error: 'Brand ID fornecido não existe'
                    });
                }
            }

            return reply.status(500).send({
                error: 'Erro ao criar venda'
            });
        }
    });

    // Rota para deletar uma venda
    fastify.delete('/delete/:saleId', {
        preHandler: async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    }, async (request, reply) => {
        try {
            const { saleId } = request.params as { saleId: string };

            if (!saleId) {
                return reply.status(400).send({
                    error: 'ID da venda é obrigatório'
                });
            }

            // Verificar se a venda existe
            const existingSale = await prisma.sale.findUnique({
                where: {
                    id: saleId
                },
                include: {
                    products: true
                }
            });

            if (!existingSale) {
                return reply.status(404).send({
                    error: 'Venda não encontrada'
                });
            }

            // Deletar primeiro a venda (devido à relação com produto)
            await prisma.sale.delete({
                where: {
                    id: saleId
                }
            });

            // Deletar o produto associado
            await prisma.product.delete({
                where: {
                    id: existingSale.products_id
                }
            });

            return reply.status(200).send({
                message: 'Venda deletada com sucesso'
            });
        } catch (err) {
            fastify.log.error(err);
            return reply.status(500).send({
                error: 'Erro ao deletar venda'
            });
        }
    });

    // Rota para listar vendas por brand
    fastify.get('/list-by-brand/:brandId', {
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

            if (!brandId) {
                return reply.status(400).send({
                    error: 'ID da marca é obrigatório'
                });
            }

            // Verificar se a marca existe
            const existingBrand = await prisma.brand.findUnique({
                where: {
                    id: brandId
                }
            });

            if (!existingBrand) {
                return reply.status(404).send({
                    error: 'Marca não encontrada'
                });
            }

            // Buscar vendas da marca
            const sales = await prisma.sale.findMany({
                where: {
                    brand_id: brandId
                },
                include: {
                    client: {
                        select: {
                            id: true,
                            full_name: true,
                            email: true,
                            phone: true
                        }
                    },
                    products: {
                        select: {
                            id: true,
                            type_of_cold_storage: true,
                            dimentions: true,
                            capacity: true,
                            observations: true
                        }
                    },
                    brand: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return reply.status(200).send({
                message: 'Vendas encontradas',
                brand: existingBrand,
                sales: sales,
                total: sales.length
            });
        } catch (err) {
            fastify.log.error(err);
            return reply.status(500).send({
                error: 'Erro ao buscar vendas'
            });
        }
    });
}