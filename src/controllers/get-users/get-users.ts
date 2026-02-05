import { IGetUsersController, IGetUsersRepository } from "./protocol.js";

export class GetUsersController implements IGetUsersController {
  getUsersRepository: IGetUsersRepository; //vai ser do tipo da interface

  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository; // a comunicacao ocm o banco de dados acontece por aq
  }

  //   constructor(private readonly getUsersRepository: IGetUsersRepository) {}  => Esta e a versao simplificada
  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return { statusCode: 500, body: "Something went wrong." };
    }
  }
}
