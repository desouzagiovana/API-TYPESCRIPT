// Singleton => garantir que tenha apenas uma única
//  instancia durante toda a execução da aplicação ( logica de conexao com o banco de dados esta toda aqui)
// UMA CLASSSE DEVE TER APENAS UMA INSTANCIA E FORNECER UM PONTO GLOBAL DE ACESSO A ELA
// Segue os principios de orientacao a ojetos, como encapsulamento e responsabilidade unica
//CONEXAO COM O BANCO DE DADOS, configuracoes globais da aplicacao (leitura de variaveis de ambiente)
// servicos de caches e controles de sessoes
//centralizacao de logs
import { MongoClient as Mongo, Db } from "mongodb";
import { MongoUser } from "../repositories/mongo-protocols.js";
import { User } from "../models/user.js";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const host = process.env.MONGODB_HOST || "localhost";
    const port = process.env.MONGODB_PORT || "27017";
    const username = process.env.MONGODB_USER || "";
    const password = process.env.MONGODB_PASSWORD || "";
    // verificar se ha usuario e senha para montar a URL
    const auth = username && password ? `${username}:${password}@` : "";
    const authSource = process.env.MONGODB_AUTHSOURCE || "admin";

    const url = `mongodb://${auth}${host}:${port}/users-db?authSource=${authSource}`;

    const client = new Mongo(url);
    await client.connect();
    const db = client.db("users-db");

    this.client = client;
    this.db = db;
    console.log(`Conectado ao MongoDB na URL: ${url}`);
  },

  // O metodo basicamente vai receber um MongoUser ( que tem _id) e retorna um User (com id)
  idFormatter(user: MongoUser): User {
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  },
};
