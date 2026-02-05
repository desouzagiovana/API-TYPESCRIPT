import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoClient } from "./database/mongo.js";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users.js";
import { CreateUserController } from "./controllers/create-user/create-user.js";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user.js";
import { UpdateUserController } from "./controllers/update-user/update-user.js";
import { DeleteUserController } from "./controllers/delete-user/delete-user.js";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user.js";

const main = async () => {
  config();

  const app = express();

  app.use(express.json()); //converte o body que recebermos no req para json

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening ON PORT ${port}`));
  await MongoClient.connect(); //chama o Singleton resposavel por conectar  com o banco

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

  // o put e usado para deletar o existente e criar um novo
  // o patch apenas atualiza parcialmente
  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserConntroller = new UpdateUserController(
      mongoUpdateUserRepository,
    );

    const { body, statusCode } = await updateUserConntroller.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserConntroller = new DeleteUserController(
      mongoDeleteUserRepository,
    );

    const { body, statusCode } = await deleteUserConntroller.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });
};

main();
