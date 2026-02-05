import validator from "validator"; // verifica validade  do email
import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse } from "../protocols.js";
import { CreateUserParams, ICreateUserRepository } from "./protocol.js";
import { ICreateUserController } from "./protocol.js";
export class CreateUserController implements ICreateUserController {
  // constructor (private readonly createUserRepository: ICreateUserRepository) {}

  createUserRepository: ICreateUserRepository;
  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }
  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      //verificar campos obrigatorios
      const requiredFields = ["firstName", "lastName", "email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `${field} is required`,
          };
        }
      }

      //validar se o body existe
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      //vallidar se o email e valido
      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }
      const user = await this.createUserRepository.createUser(httpRequest.body);
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Something went wrong. Erro: ${error}`,
      };
    }
  }
}
