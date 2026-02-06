# API de Usuários

Uma API REST desenvolvida em **Node.js + TypeScript**, criada com o objetivo de estudar e aplicar: 
**TypeScript** para tipagem estática e maior robustez 
**Princípios SOLID** para arquitetura limpa e sustentável
**Repository Pattern** para separar regras de negócio da camada de persistência 
**Docker** para containerização e padronização do ambiente
**Ciclo completo de desenvolvimento → deploy** (do código local até produção no Railway)

## Como rodar localmente

### 1. Clonar o repositório
```bash 
git clone https://github.com/seu-usuario/api.git
cd api
```

## 2. Instalar dependências
```bash
npm install
```

## 3. Configurar variáveis de ambiente
Crie um arquivo .env baseado no .env.example:

```
env
PORT: 8000

MONGODB_HOST=localhost

MONGODB_PORT=27017

MONGODB_USER=root

MONGODB_PASSWORD=

MONGODB_AUTHSOURCE=
```

## 4. Rodar em modo desenvolvimento
```bash
npm run dev
```
## 5. Build e execução em produção
```bash 
npm run build
npm start
```

