//SINGLE RESPONSABILITY DO SOLID
//Essa classe vai apenas inserir no banco e nada mais
// Quem vai validar é o controller
import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocol.js";
import { MongoClient } from "../../database/mongo.js";
import { User } from "../../models/user.js";
import { MongoUser } from "../mongo-protocols.js";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    return MongoClient.idFormatter(user);
  }
}
