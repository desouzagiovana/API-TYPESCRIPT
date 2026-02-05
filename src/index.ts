import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoClient } from "./database/mongo.js";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users.js";
import { CreateUserController } from "./controllers/create-user/create-user.js";

// app.get("/", (req, res) => {
//   res.send("Giovana hello world!");
// });

// //app e a instancia do express que representa o servidor http
// //.get() define o metodo
// // /users é o endpoint (a rota, caminho)
// // em seguida temos a funcao callback (req, res)

// // basicamente a funcao callback sera executada quando acessarmos a rota / users
// // e uma funcao assincrona porque usamo so await, precisamos aguardar a resposta do controller para prosseguir

//app.get("/users", async (req, res) => {
//   try {
//     const mongoGetUsersRepository = new MongoGetUsersRepository(); //aqui declaramos um repository
//     //   // essa classe vai conversar como banco de dados (e so isso que ela sabe)
//     //   // o controller vai controlar quando essa classe faz requisiçoes ao banco

//     const getUsersController = new GetUsersController(
//       mongoGetUsersRepository,
//     ); //injetando a classe mais externa que se  comunica com o banco aqui
//     // o controller recebe a forma pronta existente e dedfinida pela interface
//     const response = await getUsersController.handle(); // handle() e um metodo do nosso controller responsavel por retornar a resposta
//     // todo controller retorna um body e um status code
//     // por isso aguardamos o retorno do metodo handle
//     res.status(response.statusCode).send(response.body); //pede ao express que envie para o cliente o coodigo http correspondente e o corpo da resposta
//     // o resultado e atribuido la para a callback voltando la para cima
//     // quando a rota e chamada ela espera tudo isso executar e entao carrega o resultado armazenado no res
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });
const main = async () => {
  config();

  const app = express();

  app.use(express.json()); //converte o body que recebermos no req para json

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening ON PORT ${port}`));
  await MongoClient.connect(); //chama o Singleton resposavel por conectar  com o banco

  app.get("/", (req, res) => {
    console.log(`HOME PAGE`);

    res.send(`Gio HOme pAge`);
  });

  app.get("/users", async (req, res) => {
    const mongoUsersRepository = new MongoGetUsersRepository();
    const getUserController = new GetUsersController(mongoUsersRepository);

    const response = await getUserController.handle();
    res.status(response.statusCode).send(response.body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });
};

main();
