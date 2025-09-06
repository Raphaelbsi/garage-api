# 🚗 Sistema de Gerenciamento de Veículos

Sistema completo de gerenciamento de veículos desenvolvido com **NestJS** (backend) e **Angular 16** (frontend), containerizado com **Docker**.

## 🏗️ Arquitetura

### Backend (NestJS)

- **Clean Architecture** com separação de camadas
- **SOLID Principles** aplicados
- **Test-Driven Development (TDD)** - 51 testes unitários + 14 E2E
- **API REST** completa para CRUD de veículos
- **Swagger** para documentação automática
- **Validação** de dados com pipes
- **Tratamento global** de exceções

### Frontend (Angular 16)

- **Angular Material** para interface moderna
- **Reactive Forms** para formulários
- **Roteamento** completo
- **Filtros** por tipo e marca
- **Interface responsiva** e profissional

### Containerização

- **Docker Compose** para orquestração
- **Multi-stage builds** otimizados
- **Nginx** como reverse proxy
- **Rede isolada** para comunicação interna

## 🚀 Como Executar

### Pré-requisitos

- Docker
- Docker Compose

### Execução Simples

```bash
# Clone o repositório
git clone https://github.com/Raphaelbsi/garage-api.git
cd garage-api

# Execute com Docker Compose (comando único!)
docker-compose up
```

### Acessos da Aplicação

- **🌐 Frontend**: http://localhost
- **🔗 API Backend**: http://localhost:3000/api
- **📚 Documentação Swagger**: http://localhost:3000/api/docs

## 📊 Funcionalidades

### ✅ Gerenciamento de Veículos

- [x] **Listar** veículos com filtros
- [x] **Criar** novo veículo
- [x] **Visualizar** detalhes
- [x] **Editar** veículo existente
- [x] **Excluir** veículo
- [x] **Filtrar** por tipo (Carro, Moto, Caminhão)
- [x] **Filtrar** por marca
- [x] **Buscar** por texto (marca, modelo, placa)

### 📋 Campos do Veículo

- **Tipo**: Carro, Moto, Caminhão
- **Marca**: Texto livre
- **Modelo**: Texto livre
- **Ano**: Numérico (1900-2030)
- **Cor**: Seleção de cores predefinidas
- **Placa**: Formato brasileiro validado
- **Timestamps**: Criação e atualização automáticas
- **Validation**: Validação robusta de dados com class-validator
- **Documentation**: API documentada com Swagger/OpenAPI
- **Containerization**: Aplicação dockerizada com Docker Compose
- **Error Handling**: Tratamento global de erros

## 📋 Funcionalidades

### CRUD de Veículos

- ✅ Criar veículo
- ✅ Listar todos os veículos
- ✅ Buscar veículo por ID
- ✅ Atualizar veículo
- ✅ Excluir veículo

### Validações de Negócio

- ✅ Validação de formato de placa (padrão antigo e Mercosul)
- ✅ Validação de chassi (17 caracteres)
- ✅ Validação de RENAVAM (11 dígitos)
- ✅ Validação de ano (entre 1886 e ano atual + 1)
- ✅ Constraints de unicidade (placa, chassi, RENAVAM únicos)

## 🛠️ Tecnologias

- **NestJS**: Framework Node.js robusto
- **TypeScript**: Linguagem tipada
- **Jest**: Framework de testes
- **Swagger**: Documentação de API
- **Class Validator**: Validação de dados
- **Docker**: Containerização
- **UUID**: Geração de IDs únicos

## 📁 Estrutura do Projeto

```
src/
├── domain/                 # Camada de Domínio
│   ├── entities/          # Entidades de negócio
│   └── repositories/      # Interfaces dos repositórios
├── application/           # Camada de Aplicação
│   ├── dtos/             # Data Transfer Objects
│   └── use-cases/        # Casos de uso
├── infrastructure/        # Camada de Infraestrutura
│   └── repositories/     # Implementações concretas
├── presentation/          # Camada de Apresentação
│   └── controllers/      # Controllers REST
├── common/               # Código compartilhado
│   └── filters/         # Filtros de exceção
├── vehicle.module.ts     # Módulo principal de veículos
├── app.module.ts        # Módulo raiz da aplicação
└── main.ts             # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Raphaelbsi/garage-api.git
cd garage-api

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Executar em modo desenvolvimento
npm run start:dev

# Executar testes
npm test

# Executar testes E2E
npm run test:e2e

# Executar testes com coverage
npm run test:cov
```

### Produção

```bash
# Build da aplicação
npm run build

# Executar em produção
npm run start:prod
```

### Docker

```bash
# Build e execução com Docker Compose
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar os containers
docker-compose down
```

## 📚 Documentação da API

Após executar a aplicação, acesse:

- **Swagger UI**: http://localhost:3000/api/docs
- **API**: http://localhost:3000

### Endpoints

| Método | Endpoint        | Descrição                |
| ------ | --------------- | ------------------------ |
| POST   | `/vehicles`     | Criar veículo            |
| GET    | `/vehicles`     | Listar todos os veículos |
| GET    | `/vehicles/:id` | Buscar veículo por ID    |
| PATCH  | `/vehicles/:id` | Atualizar veículo        |
| DELETE | `/vehicles/:id` | Excluir veículo          |

### Exemplo de Payload

```json
{
  "placa": "ABC-1234",
  "chassi": "1HGBH41JXMN109186",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

## 🧪 Testes

O projeto possui uma cobertura completa de testes:

- **Testes Unitários**: 51 testes cobrindo entidades, use cases, repositórios e controllers
- **Testes de Integração**: 14 testes E2E cobrindo todos os cenários da API
- **TDD**: Desenvolvimento orientado por testes (Red-Green-Refactor)

```bash
# Executar todos os testes
npm test

# Testes com watch mode
npm run test:watch

# Testes E2E
npm run test:e2e

# Coverage report
npm run test:cov
```

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Coverage completo
npm run test:cov
```

**Cobertura Atual**: 51 testes unitários + 14 testes E2E = 65 testes

## 🐳 Docker

### Containers do Sistema

- **garage-backend**: API NestJS (porta 3000)
- **garage-frontend**: Angular + Nginx (porta 80)
- **garage-network**: Rede interna isolada

### Comandos Docker Úteis

```bash
# Build completo
docker-compose build

# Executar em background
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs frontend
docker-compose logs backend

# Parar todos os containers
docker-compose down

# Rebuild sem cache (quando há mudanças)
docker-compose build --no-cache

# Executar comandos dentro do container
docker exec garage-backend npm run test
docker exec garage-frontend ls /usr/share/nginx/html
```

## 🛠️ Desenvolvimento Local

### Backend Standalone

```bash
cd garage-api
npm install
npm run start:dev
# API: http://localhost:3000
```

### Frontend Standalone

```bash
cd frontend/garage-frontend
npm install
ng serve
# App: http://localhost:4200
```

## 📁 Estrutura Detalhada

```
garage-api/
├── 📁 src/                          # Backend NestJS
│   ├── 📁 application/             # Casos de uso
│   │   ├── 📁 use-cases/
│   │   └── 📁 dtos/
│   ├── 📁 domain/                  # Entidades
│   │   ├── 📁 entities/
│   │   └── 📁 repositories/
│   ├── 📁 infrastructure/          # Implementações
│   │   └── 📁 repositories/
│   └── 📁 presentation/            # Controllers
│       └── 📁 controllers/
├── 📁 frontend/
│   └── 📁 garage-frontend/         # Angular App
│       ├── 📁 src/app/
│       │   ├── 📁 components/      # Componentes UI
│       │   ├── 📁 models/          # Types/Interfaces
│       │   ├── 📁 services/        # HTTP Services
│       │   └── 📁 environments/    # Configs
├── 📁 test/                        # Testes E2E
├── 🐳 docker-compose.yml           # Orquestração
├── 🐳 Dockerfile                   # Container Backend
└── 📖 README.md                    # Este arquivo
```

## 🔧 Stack Tecnológica

### Backend

- **NestJS** 10.x - Framework Node.js
- **TypeScript** 5.x - Linguagem
- **Jest** - Framework de testes
- **Swagger/OpenAPI** 3.x - Documentação
- **Class Validator** - Validação de dados

### Frontend

- **Angular** 16.x - Framework SPA
- **Angular Material** 16.x - UI Components
- **RxJS** - Programação reativa
- **TypeScript** 5.x - Linguagem
- **Angular CLI** - Tooling

### DevOps & Infra

- **Docker** & **Docker Compose** - Containerização
- **Nginx** - Servidor web e proxy reverso
- **Node.js** 18 Alpine - Runtime container

## 📈 Status do Projeto

| Componente      | Status  | Cobertura           |
| --------------- | ------- | ------------------- |
| 🎯 Backend API  | ✅ 100% | 51 testes unitários |
| 🎨 Frontend UI  | ✅ 100% | Interface completa  |
| 🧪 Testes E2E   | ✅ 100% | 14 cenários         |
| 🐳 Docker       | ✅ 100% | Multi-container     |
| 📚 Documentação | ✅ 100% | Swagger + README    |

## 🎯 Funcionalidades Implementadas

### ✅ CRUD Completo de Veículos

- Criar novo veículo
- Listar todos os veículos
- Buscar veículo por ID
- Atualizar veículo existente
- Excluir veículo

### ✅ Filtros e Busca

- Filtro por tipo de veículo
- Filtro por marca
- Busca por texto livre
- Combinação de filtros

### ✅ Validações

- Placa no formato brasileiro
- Ano entre 1900-2030
- Campos obrigatórios
- Tipos de dados corretos

### ✅ Interface de Usuário

- Design Material responsivo
- Formulários reativos
- Confirmações de ação
- Loading states
- Tratamento de erros

## 👨‍💻 Autor

**Raphael Souza de Oliveira**

- GitHub: [@Raphaelbsi](https://github.com/Raphaelbsi)
- Email: raphaelbsi@example.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

### 🏆 Projeto Concluído com Sucesso!

Sistema completo de gerenciamento de veículos com:

- ✅ **Clean Architecture** e **SOLID**
- ✅ **TDD** com 65 testes
- ✅ **Frontend moderno** Angular Material
- ✅ **Containerização** Docker completa
- ✅ **Documentação** Swagger automática

**Comando único para executar**: `docker-compose up` 🚀

- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Subclasses podem substituir suas classes base
- **I**nterface Segregation: Interfaces específicas são melhores que genéricas
- **D**ependency Inversion: Dependa de abstrações, não de implementações

### Design Patterns

- **Repository Pattern**: Abstração da camada de dados
- **Use Case Pattern**: Encapsulamento de lógica de negócio
- **Dependency Injection**: Inversão de controle
- **Factory Pattern**: Criação de objetos
- **Strategy Pattern**: Diferentes estratégias de validação

## 🔧 Configuração

### Variáveis de Ambiente

```bash
NODE_ENV=development
PORT=3000
```

### Validações

A API implementa validações robustas:

- **Placa**: Formato brasileiro (ABC-1234 ou ABC1D23)
- **Chassi**: Exatamente 17 caracteres alfanuméricos
- **RENAVAM**: Exatamente 11 dígitos numéricos
- **Ano**: Entre 1886 e ano atual + 1
- **Unicidade**: Placa, chassi e RENAVAM únicos

## 📈 Melhorias Futuras

- [ ] Integração com banco de dados PostgreSQL
- [ ] Cache com Redis
- [ ] Autenticação e autorização JWT
- [ ] Rate limiting
- [ ] Logs estruturados
- [ ] Métricas e monitoramento
- [ ] CI/CD pipeline
- [ ] Documentação de arquitetura

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Raphael Souza de Oliveira**

- GitHub: [@Raphaelbsi](https://github.com/Raphaelbsi)
- LinkedIn: [Raphael Souza](https://linkedin.com/in/raphael-souza)

---

**Desenvolvimento Senior Full Stack evidenciando conhecimento em:**

- Clean Architecture e SOLID
- Test-Driven Development (TDD)
- Design Patterns
- NestJS e TypeScript
- Containerização com Docker
- APIs RESTful bem documentadas
