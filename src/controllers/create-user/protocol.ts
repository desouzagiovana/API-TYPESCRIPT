import { User } from "../../models/user.js";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ICreateUserRepository {
  createUser(paramns: CreateUserParams): Promise<User>;
}
