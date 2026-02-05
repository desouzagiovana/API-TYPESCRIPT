import { User } from "../../models/user.js";
import { badRequest, ok, serverError } from "../helpers.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { IDeleteUserRepository } from "./protocol.js";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        // return {
        //   statusCode: 400,
        //   body: "Missing user id",
        // };
        return badRequest("Missing user id");
      }
      const user = await this.deleteUserRepository.deleteUser(id);

      // return {
      //   statusCode: 200,
      //   body: user,
      // };
      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
