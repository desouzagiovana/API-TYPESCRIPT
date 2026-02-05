import { IGetUsersRepository } from "../../controllers/get-users/protocol.js";
import { MongoClient } from "../../database/mongo.js";
import { User } from "../../models/user.js";
import { MongoUser } from "../mongo-protocols.js";

//pegar os usuarios do mongo
export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users") // terei varios objetos User que nao terao campo id
      .find({})
      .toArray();
    return users.map(({ _id, ...rest }) => ({
      //no mongo o id vem como _id, e para usarmos aqui precisamos retirar o _
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
