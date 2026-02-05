import validator from "validator"; // verifica validade  do email
import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { CreateUserParams, ICreateUserRepository } from "./protocol.js";
import { badRequest, created, serverError } from "../helpers.js";
export class CreateUserController implements IController {
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
          // return {
          //   statusCode: 400,
          //   body: `${field} is required`,
          // };
          return badRequest(`Field ${field} is required`);
        }
      }

      //validar se o body existe
      if (!httpRequest.body) {
        return badRequest("Please specify a body");
      }

      //vallidar se o email e valido
      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        // return {
        //   statusCode: 400,
        //   body: "E-mail is invalid",
        // };
        return badRequest("E-mail is invalid");
      }
      const user = await this.createUserRepository.createUser(httpRequest.body);
      // return {
      //   statusCode: 201,
      //   body: user,
      // };

      return created(user);
    } catch (error) {
      return serverError();
    }
  }
}
