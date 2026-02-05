// Este arquivo é um arquivo de interfaces comuns aos controllers da aplicacao

// um controller sempre retornan uma resposta do tipo
//statusCode e body, por isso vamos criar uma interface para isso

export interface HttpResponse<T> {
  statusCode: number; // statusCode e do tipo number 500, 200
  body: T | string; //poderiamos declarar como any, mas usamos o generic aqui
}
