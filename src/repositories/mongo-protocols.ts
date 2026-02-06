import { ObjectId } from "mongodb"; //tipo especial que o MOngo usa para identificar o _id
import { User } from "../models/user.js";
// Omit e um utilitario do typescript que remove um propriedade de um tipo
// nesse caso temos o tipo User e o Omit esta removendo a propriedade id dele
// pois o MongoUser tem _id ( e isso daria um conflito de  declaracoes), para nao conflitar
//omitimos a propriedade user e o Mongo pode usar o seu _id livremente
// resultado e um tipo User sem o id

export type MongoUser = Omit<User, "id"> & { _id: ObjectId };

//com o & nos podemos fazer interesecao de tipos
// entao adicionamos ao tipo User sem id uma nova propriedade _id, que e do tipo ObjectId que importamos do Mongo

// Agora MongoUser vai ser um tipo User com todas as propriedades menos id, e com a propriedade _id
