import { User } from "../../models/user.js";
export interface UpdateUserParams {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

// export interface IUpdateUserController {
//   handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
// }

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
