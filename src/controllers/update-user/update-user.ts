import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse } from "../protocols.js";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols.js";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      // precisamos validar se vem algum id
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }
      // se o usario passar algum campo que nao seja permitido de atualizaca deve barrar
      const allowedFieldsToUpdate = [
        "firstName",
        "lastName",
        "email",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key),
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }
      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Something went wrong. Error: ${error}`,
      };
    }
  }
}
