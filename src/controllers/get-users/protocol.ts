import { User } from "../../models/user.js";
import { HttpResponse } from "../protocols.js"; // importamos a interface do tipo de resposta dos controllers

// descreve a forma que deve ter
// e uma interface que representa o controller responsavel por obter usuarios
//quem implementar essa interface deve ter o que ela definir
export interface IGetUsersController {
  handle(): Promise<HttpResponse<User[]>>; //como generic vai retornar uma lista de usuarios

  // estamos definindo o tipo do retorno da funcao handle()
  // ela vai retornar um Promise, (uma operacao assincrona que eventualmente sera resolvida com sucesso ou erro)
  // vai retornar um Httpresponse contendo um array de usuarios
  // HttpResponse vai conter uma lista de usuarios
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>; // vai retornar uma promise e um array de usuarios
  // a interface de user esta definida em models/user.ts
}
