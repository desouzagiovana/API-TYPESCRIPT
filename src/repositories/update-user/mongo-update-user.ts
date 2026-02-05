import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocols.js";
import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo.js";
import { User } from "../../models/user.js";
export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      },
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ id });

    if (!user) {
      throw new Error(`User not updated`);
    }

    // fazer como no create a destruction necessaria para o mongo
    //converter o id para _id...

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
