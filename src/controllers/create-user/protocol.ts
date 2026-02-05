import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse } from "../protocols.js";

// export interface ICreateUserController {
//   handle(
//     httpRequest: HttpRequest<CreateUserParams>,
//   ): Promise<HttpResponse<User>>;
// }
export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
