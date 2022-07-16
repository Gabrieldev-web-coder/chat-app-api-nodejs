import { MongoClient } from "mongodb";
import * as bcrypt from "bcrypt";

const CheckUserInDatabase = (
  dbUrl: string,
  dbName: string,
  collectionName: string,
  username: string,
  userpassword: string
) => {
  const MongoDB = new MongoClient(dbUrl)
    .db(dbName)
    .collection(collectionName)
    .findOne({ username: username, password: userpassword }, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
};
