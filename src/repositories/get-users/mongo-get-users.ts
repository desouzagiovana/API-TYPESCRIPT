import { IGetUsersRepository } from "../../controllers/get-users/protocol.js";
import { User } from "../../models/user.js";

//pegar os usuarios do mongo
export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Giovana",
        lastName: "de Souza",
        email: "giovana@email.com",
        password: "123",
      },
    ];
  }
}
