import { User } from "../models/user.js";
import { HttpResponse, HttpStatusCode } from "./protocols.js";

export const ok = (body: any): HttpResponse<User> => ({
  statusCode: HttpStatusCode.OK,
  body,
});
export const created = (body: any): HttpResponse<User> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});
export const badRequest = (message: string): HttpResponse<User> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};
export const serverError = (): HttpResponse<User> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};
