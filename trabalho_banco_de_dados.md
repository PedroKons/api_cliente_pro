# NOME DA INSTITUIÇÃO
## NOME DA ESCOLA / CURSO

### DISCIPLINA DE BANCO DE DADOS

**PROJETO DE BANCO DE DADOS: SISTEMA DE GESTÃO DE CLIENTES E VENDAS**

**Autores:**
*   NOME COMPLETO DO AUTOR 1 - MATRÍCULA
*   NOME COMPLETO DO AUTOR 2 - MATRÍCULA

**Professor:**
*   NOME DO PROFESSOR

**CIDADE - ANO**

---

# Sumário

1.  [Capítulo 1 – Definição](#capítulo-1--definição)
    *   [Formulação do problema](#formulação-do-problema)
    *   [Solução proposta](#solução-proposta)
    *   [Delimitação do escopo](#delimitação-do-escopo)
    *   [Objetivo Geral](#objetivo-geral)
2.  [Capítulo 2 – Projeto Conceitual](#capítulo-2--projeto-conceitual)
    *   [Diagrama de Entidade-Relacionamento (DER)](#diagrama-de-entidade-relacionamento-der)
3.  [Capítulo 3 – Projeto Lógico](#capítulo-3--projeto-lógico)
    *   [Estrutura do Projeto Lógico Normalizado](#estrutura-do-projeto-lógico-normalizado)
    *   [Diagrama Relacional (DR)](#diagrama-relacional-dr)
4.  [Capítulo 4 – Projeto Físico](#capítulo-4--projeto-físico)
    *   [Dicionário de Dados](#dicionário-de-dados)
    *   [Código SQL para Criação do Banco (MySQL)](#código-sql-para-criação-do-banco-mysql)
    *   [Código SQL para População do Banco](#código-sql-para-população-do-banco)
5.  [Referências](#referências)

---

# Capítulo 1 – Definição

### Formulação do problema

Empresas que comercializam equipamentos técnicos de grande porte, como sistemas de refrigeração industrial e câmaras frias, enfrentam desafios significativos na gestão do ciclo de vida de suas vendas. O processo não termina com o pagamento, estendendo-se para etapas críticas de pós-venda como agendamento de entrega, instalação por técnicos especializados, gestão de garantia e chamados de suporte técnico. A falta de um sistema centralizado para gerenciar essas informações resulta em falhas de comunicação, atrasos, perda de dados do cliente e um acompanhamento pós-venda ineficiente.

O público-alvo deste projeto são pequenas e médias empresas que atuam no setor de refrigeração comercial e industrial. Atualmente, muitas dessas empresas dependem de planilhas, documentos de texto e múltiplos canais de comunicação (e-mail, telefone) para rastrear os pedidos dos clientes. Essa abordagem manual é propensa a erros, dificulta a obtenção de uma visão consolidada sobre o status de cada venda e compromete a qualidade do serviço ao cliente, impactando negativamente a sua satisfação e fidelização.

### Solução proposta

Para solucionar os problemas identificados, propõe-se o desenvolvimento de um sistema de informação web centralizado para a gestão de clientes e vendas. A plataforma permitirá o cadastro detalhado de clientes (sejam pessoas físicas ou jurídicas), o registro de produtos com suas especificações técnicas (como tipo de refrigeração, dimensões e capacidade) e, crucialmente, o gerenciamento completo do processo de venda e pós-venda de cada equipamento.

O sistema oferecerá um painel de controle onde os usuários (vendedores, administradores) poderão registrar novas vendas, associando-as a um cliente e a um produto específico. A partir daí, será possível registrar todas as etapas subsequentes: o valor e a forma de pagamento, a data de entrega, o profissional responsável pela instalação e o tempo de garantia. A plataforma também permitirá o registro de chamados técnicos, criando um histórico completo para cada venda e facilitando o suporte e a manutenção, otimizando assim os processos internos e elevando a qualidade do atendimento ao cliente.

### Delimitação do escopo

O escopo do projeto está delimitado ao desenvolvimento das funcionalidades essenciais para o gerenciamento do fluxo de vendas de equipamentos. O sistema armazenará dados de seis entidades principais e seus relacionamentos: **Clientes**, que podem ter um **Endereço** associado; **Produtos**, com suas características técnicas; **Vendas**, que conectam um cliente a um produto e registram todo o ciclo de vida da transação; **Brand** (Marca/Empresa), que permite que múltiplas empresas possam utilizar o sistema; e **User** (Usuário), que controla o acesso ao sistema. Todas as entidades estarão interligadas, garantindo a integridade e a rastreabilidade das informações.

### Objetivo Geral

Desenvolver um sistema web para otimizar o gerenciamento do processo de vendas e pós-venda de equipamentos técnicos, centralizando as informações de clientes, produtos e transações para melhorar a eficiência operacional e a satisfação do cliente.

---

# Capítulo 2 – Projeto Conceitual

O projeto conceitual é a primeira e mais abstrata fase do projeto de um banco de dados. Seu principal objetivo é traduzir os requisitos de negócio e as necessidades de informação dos usuários em uma estrutura de dados de alto nível, que seja independente de qualquer sistema de gerenciamento de banco de dados (SGBD) específico. Nesta etapa, o foco está em identificar as principais "coisas" (entidades) sobre as quais a organização precisa armazenar informações, os fatos (atributos) que descrevem essas entidades e como elas se associam umas com as outras (relacionamentos).

Segundo Elmasri e Navathe (2011), o modelo conceitual de dados serve como uma ferramenta de comunicação crucial entre os projetistas do banco de dados e os stakeholders (usuários finais, gestores), pois utiliza uma linguagem gráfica e semântica de fácil compreensão, como o Diagrama de Entidade-Relacionamento (DER). O resultado desta fase é um esquema conceitual que representa a visão global dos dados da organização, garantindo que todos os requisitos informacionais foram corretamente capturados antes de se avançar para as complexidades técnicas das fases de projeto lógico e físico.

### Diagrama de Entidade-Relacionamento (DER)

O diagrama abaixo representa a estrutura conceitual do projeto.

> **Instrução:** Crie o diagrama em uma ferramenta como draw.io ou Lucidchart e insira a imagem aqui.

![Representação do DER](https://i.imgur.com/8Q5kF81.png)
*Figura 1 - Diagrama de Entidade-Relacionamento (simplificado). Fonte: Autoria própria (2025).*

---

# Capítulo 3 – Projeto Lógico

O projeto lógico é a fase que sucede o projeto conceitual e tem como objetivo transformar o esquema conceitual (DER) em um modelo de dados implementável por um SGBD, mas ainda sem se preocupar com os detalhes físicos de armazenamento. Nesta etapa, as entidades e relacionamentos do DER são mapeados para uma estrutura de tabelas, colunas, chaves primárias e chaves estrangeiras. É também nesta fase que se aplica a **normalização**, um processo formal para garantir que o banco de dados tenha uma estrutura consistente, evite redundância de dados e anomalias de inserção, atualização e exclusão.

Conforme Date (2004), a normalização é fundamental para projetar bancos de dados que sejam robustos e fáceis de manter. O processo envolve a aplicação de um conjunto de regras, conhecidas como formas normais (1FN, 2FN, 3FN, etc.), para decompor tabelas complexas em tabelas menores e mais bem estruturadas. O objetivo é assegurar que cada tabela represente uma única entidade e que os atributos dependam exclusivamente da chave primária, resultando em um modelo de dados íntegro e eficiente.

### Estrutura do Projeto Lógico Normalizado

A seguir, a estrutura textual do projeto lógico, representando as tabelas e seus relacionamentos.

*   **Brand**(`id` PK, `name`, `createdAt`, `updatedAt`)
*   **User**(`id` PK, `brand_id` FK, `name`, `email` UQ, `password`, `createdAt`, `updatedAt`)
*   **Address**(`id` PK, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `zip_code`, `country`, `createdAt`, `updatedAt`)
*   **Client**(`id` PK, `brand_id` FK, `address_id` FK UQ, `client_type`, `full_name`, `date_of_birth`, `cpf`, `company_name`, `fantasy_name`, `cnpj`, `state_registration`, `phone`, `email`, `observations`, `createdAt`, `updatedAt`)
*   **Product**(`id` PK, `brand_id` FK, `type_of_cold_storage`, `dimentions`, `capacity`, `observations`, `createdAt`, `updatedAt`)
*   **Sale**(`id` PK, `brand_id` FK, `client_id` FK, `products_id` FK UQ, `sale_date`, `origin_sale`, `seller`, `sale_value`, `payment_method`, `parcel_number`, `delivery_date`, `responsible_for_installation`, `obvervations_technical`, `warranty_time`, `status_sale`, `called_technical`, `observations`, `createdAt`, `updatedAt`)

*Legenda: PK (Primary Key), FK (Foreign Key), UQ (Unique Constraint).*

### Diagrama Relacional (DR)

O Diagrama Relacional (DR) é a representação visual do projeto lógico. Ele mostra as tabelas com suas respectivas colunas, chaves primárias e os relacionamentos entre elas através das chaves estrangeiras.

> **Instrução:** Crie o diagrama relacional (que se assemelha ao DER, mas com foco em tabelas e chaves) e insira a imagem aqui.

---

# Capítulo 4 – Projeto Físico

O projeto físico é a fase final do processo de design de banco de dados, onde o modelo lógico é traduzido em uma implementação concreta para um SGBD específico, como MySQL, PostgreSQL ou Oracle. O principal objetivo desta etapa é definir como os dados serão fisicamente armazenados, considerando aspectos de performance, segurança e integridade. Isso inclui a escolha dos tipos de dados exatos para cada coluna, a definição de índices para otimizar consultas, a configuração de constraints e a alocação de espaço em disco.

Para Heuser (2008), o projeto físico deve levar em conta as características particulares do SGBD escolhido. O projetista deve tomar decisões que impactarão diretamente o desempenho do sistema, como a criação de índices secundários em colunas frequentemente usadas em cláusulas `WHERE`, a partição de tabelas muito grandes e a configuração de parâmetros de armazenamento. Um bom projeto físico garante que o banco de dados não apenas represente corretamente os dados, mas também responda às consultas da aplicação de forma rápida e eficiente.

### Dicionário de Dados

O dicionário de dados a seguir detalha a estrutura de cada tabela do projeto para implementação em MySQL.

<!-- (O dicionário de dados está igual ao da resposta anterior, pode ser copiado para o arquivo) -->

**Tabela: `brand`**
| Campo | Tipo de Dado (MySQL) | Chave | Descrição |
| :--- | :--- | :--- | :--- |
| id | VARCHAR(36) | PK | Identificador único da marca/empresa. |
| name | VARCHAR(255) | | Nome da marca/empresa. |
| createdAt | DATETIME | | Data e hora de criação do registro. |
| updatedAt | DATETIME | | Data e hora da última atualização do registro. |

**Tabela: `user`**
| Campo | Tipo de Dado (MySQL) | Chave | Descrição |
| :--- | :--- | :--- | :--- |
| id | VARCHAR(36) | PK | Identificador único do usuário. |
| brand_id | VARCHAR(36) | FK | Chave estrangeira para a tabela `brand`. |
| name | VARCHAR(255) | | Nome completo do usuário. |
| email | VARCHAR(255) | UQ | E-mail de login do usuário (único). |
| password | VARCHAR(255) | | Senha criptografada do usuário. |
| createdAt | DATETIME | | Data e hora de criação do registro. |
| updatedAt | DATETIME | | Data e hora da última atualização do registro. |

**Tabela: `address`**
| Campo | Tipo de Dado (MySQL) | Chave | Descrição |
| :--- | :--- | :--- | :--- |
| id | VARCHAR(36) | PK | Identificador único do endereço. |
| street | VARCHAR(255) | | Nome da rua. |
| number | VARCHAR(50) | | Número do imóvel. |
| complement | VARCHAR(255) | | Complemento do endereço. |
| neighborhood | VARCHAR(255) | | Bairro. |
| city | VARCHAR(255) | | Cidade. |
| state | VARCHAR(2) | | Sigla do estado (UF). |
| zip_code | VARCHAR(10) | | CEP. |
| country | VARCHAR(100) | | País. |
| createdAt | DATETIME | | Data e hora de criação do registro. |
| updatedAt | DATETIME | | Data e hora da última atualização do registro. |

**Tabela: `client`**
| Campo | Tipo de Dado (MySQL) | Chave | Descrição |
| :--- | :--- | :--- | :--- |
| id | VARCHAR(36) | PK | Identificador único do cliente. |
| brand_id | VARCHAR(36) | FK | Chave estrangeira para a tabela `brand`. |
| address_id | VARCHAR(36) | FK, UQ| Chave estrangeira para a tabela `address`. |
| client_type | VARCHAR(50) | | Tipo de cliente (Pessoa Física ou Jurídica). |
| full_name | VARCHAR(255) | | Nome completo (se Pessoa Física). |
| date_of_birth | DATE | | Data de nascimento (se Pessoa Física). |
| cpf | VARCHAR(14) | | CPF do cliente. |
| company_name | VARCHAR(255) | | Razão Social (se Pessoa Jurídica). |
| fantasy_name | VARCHAR(255) | | Nome Fantasia (se Pessoa Jurídica). |
| cnpj | VARCHAR(18) | | CNPJ do cliente. |
| state_registration | VARCHAR(50) | | Inscrição Estadual. |
| phone | VARCHAR(20) | | Telefone de contato principal. |
| email | VARCHAR(255) | | E-mail de contato. |
| observations | TEXT | | Observações gerais sobre o cliente. |
| createdAt | DATETIME | | Data e hora de criação do registro. |
| updatedAt | DATETIME | | Data e hora da última atualização do registro. |

**Tabela: `product`**
| Campo | Tipo de Dado (MySQL) | Chave | Descrição |
| :--- | :--- | :--- | :--- |
| id | VARCHAR(36) | PK | Identificador único do produto. |
| brand_id | VARCHAR(36) | FK | Chave estrangeira para a tabela `brand`. |
| type_of_cold_storage | VARCHAR(255)| | Tipo de câmara fria/equipamento. |
| dimentions | VARCHAR(100) | | Dimensões do produto (ex: 2.5x3x2.2m). |
| capacity | FLOAT | | Capacidade (em litros, m³, etc.). |
| observations | TEXT | | Observações técnicas sobre o produto. |
| createdAt | DATETIME | | Data e hora de criação do registro. |
| updatedAt | DATETIME | | Data e hora da última atualização do registro. |

**Tabela: `sale`**
| Campo | Tipo de Dado (MySQL) | Chave | Descrição |
| :--- | :--- | :--- | :--- |
| id | VARCHAR(36) | PK | Identificador único da venda. |
| brand_id | VARCHAR(36) | FK | Chave estrangeira para a tabela `brand`. |
| client_id | VARCHAR(36) | FK | Chave estrangeira para a tabela `client`. |
| products_id | VARCHAR(36) | FK, UQ| Chave estrangeira para a tabela `product`. |
| sale_date | DATETIME | | Data em que a venda foi realizada. |
| origin_sale | VARCHAR(100) | | Origem da venda (ex: Indicação, Site). |
| seller | VARCHAR(255) | | Nome do vendedor responsável. |
| sale_value | DECIMAL(10,2) | | Valor total da venda. |
| payment_method | VARCHAR(100) | | Forma de pagamento (ex: À vista, Parcelado). |
| parcel_number | INT | | Número de parcelas. |
| delivery_date | DATETIME | | Data agendada para entrega. |
| responsible_for_installation | VARCHAR(255) | | Nome do técnico responsável pela instalação. |
| obvervations_technical | TEXT | | Observações técnicas da instalação. |
| warranty_time | INT | | Tempo de garantia em meses. |
| status_sale | VARCHAR(100) | | Status atual da venda (ex: Em negociação). |
| called_technical | VARCHAR(100) | | Houve chamado técnico? (Sim/Não). |
| observations | TEXT | | Observações gerais sobre a venda. |
| createdAt | DATETIME | | Data e hora de criação do registro. |
| updatedAt | DATETIME | | Data e hora da última atualização do registro. |

### Código SQL para Criação do Banco (MySQL)

```sql
CREATE DATABASE IF NOT EXISTS `api_cliente_pro`;
USE `api_cliente_pro`;

-- Tabela Brand
CREATE TABLE `brand` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela User
CREATE TABLE `user` (
    `id` VARCHAR(36) NOT NULL,
    `brand_id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_email_unique` (`email`),
    FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela Address
CREATE TABLE `address` (
    `id` VARCHAR(36) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `number` VARCHAR(50) NOT NULL,
    `complement` VARCHAR(255) NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `zip_code` VARCHAR(10) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela Client
CREATE TABLE `client` (
    `id` VARCHAR(36) NOT NULL,
    `brand_id` VARCHAR(36) NOT NULL,
    `address_id` VARCHAR(36) NOT NULL,
    `client_type` VARCHAR(50) NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `date_of_birth` DATE NULL,
    `cpf` VARCHAR(14) NULL,
    `company_name` VARCHAR(255) NULL,
    `fantasy_name` VARCHAR(255) NULL,
    `cnpj` VARCHAR(18) NULL,
    `state_registration` VARCHAR(50) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `observations` TEXT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `client_address_id_unique` (`address_id`),
    FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela Product
CREATE TABLE `product` (
    `id` VARCHAR(36) NOT NULL,
    `brand_id` VARCHAR(36) NOT NULL,
    `type_of_cold_storage` VARCHAR(255) NOT NULL,
    `dimentions` VARCHAR(100) NOT NULL,
    `capacity` FLOAT NOT NULL,
    `observations` TEXT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela Sale
CREATE TABLE `sale` (
    `id` VARCHAR(36) NOT NULL,
    `brand_id` VARCHAR(36) NOT NULL,
    `client_id` VARCHAR(36) NOT NULL,
    `products_id` VARCHAR(36) NOT NULL,
    `sale_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `origin_sale` VARCHAR(100) NULL,
    `seller` VARCHAR(255) NOT NULL,
    `sale_value` DECIMAL(10,2) NOT NULL,
    `payment_method` VARCHAR(100) NOT NULL,
    `parcel_number` INT NOT NULL DEFAULT 1,
    `delivery_date` DATETIME NOT NULL,
    `responsible_for_installation` VARCHAR(255) NULL,
    `obvervations_technical` TEXT NULL,
    `warranty_time` INT NULL,
    `status_sale` VARCHAR(100) NOT NULL,
    `called_technical` VARCHAR(100) NULL,
    `observations` TEXT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `sale_products_id_unique` (`products_id`),
    FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`products_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

```

### Código SQL para População do Banco

```sql
-- Usar o banco de dados correto
USE `api_cliente_pro`;

-- 1. Inserir uma Brand
INSERT INTO `brand` (`id`, `name`) VALUES
('brand-01', 'Refrigeração Polar');

-- 2. Inserir Usuários para a Brand
INSERT INTO `user` (`id`, `brand_id`, `name`, `email`, `password`) VALUES
('user-01', 'brand-01', 'Admin Polar', 'admin@polar.com', 'senha_super_segura_hash'),
('user-02', 'brand-01', 'Vendedor João', 'joao.vendedor@polar.com', 'outra_senha_segura_hash');

-- 3. Inserir Endereços
INSERT INTO `address` (`id`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `zip_code`, `country`) VALUES
('addr-01', 'Rua das Indústrias', '123', 'Galpão A', 'Distrito Industrial', 'São Paulo', 'SP', '01234-567', 'Brasil'),
('addr-02', 'Avenida do Comércio', '456', NULL, 'Centro', 'Rio de Janeiro', 'RJ', '98765-432', 'Brasil');

-- 4. Inserir Clientes (associados à Brand e aos Endereços)
INSERT INTO `client` (`id`, `brand_id`, `address_id`, `client_type`, `company_name`, `fantasy_name`, `cnpj`, `phone`, `email`, `observations`) VALUES
('client-01', 'brand-01', 'addr-01', 'Pessoa Jurídica', 'Supermercados ABC Ltda', 'Mercado ABC', '12.345.678/0001-99', '11987654321', 'compras@mercadoabc.com', 'Cliente antigo, bom pagador.');

INSERT INTO `client` (`id`, `brand_id`, `address_id`, `client_type`, `full_name`, `date_of_birth`, `cpf`, `phone`, `email`) VALUES
('client-02', 'brand-01', 'addr-02', 'Pessoa Física', 'Carlos Silva', '1985-10-20', '123.456.789-00', '21912345678', 'carlos.silva@email.com');

-- 5. Inserir Produtos (associados à Brand)
INSERT INTO `product` (`id`, `brand_id`, `type_of_cold_storage`, `dimentions`, `capacity`, `observations`) VALUES
('prod-01', 'brand-01', 'Câmara Fria para Resfriados', '3x4x2.5m', 30000, 'Motor Copeland, painéis de 100mm.'),
('prod-02', 'brand-01', 'Balcão Expositor Refrigerado', '2x1x1.2m', 800, 'Vidro duplo, iluminação LED.');

-- 6. Inserir uma Venda
INSERT INTO `sale` (`id`, `brand_id`, `client_id`, `products_id`, `sale_date`, `seller`, `sale_value`, `payment_method`, `parcel_number`, `delivery_date`, `responsible_for_installation`, `warranty_time`, `status_sale`) VALUES
('sale-01', 'brand-01', 'client-01', 'prod-01', '2025-06-20 10:00:00', 'Vendedor João', 45000.00, 'Parcelado', 10, '2025-07-15 09:00:00', 'Técnico Mário', 24, 'Instalação Agendada');

```

---

# Referências

DATE, C. J. **Introdução a Sistemas de Bancos de Dados**. 8. ed. Rio de Janeiro: Elsevier, 2004.

ELMASRI, R.; NAVATHE, S. B. **Sistemas de Banco de Dados**. 6. ed. São Paulo: Pearson Addison-Wesley, 2011.

HEUSER, C. A. **Projeto de Banco de Dados**. 6. ed. Porto Alegre: Bookman, 2008. 