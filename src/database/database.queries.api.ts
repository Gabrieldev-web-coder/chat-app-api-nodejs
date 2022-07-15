import { MongoClient, ServerApiVersion, MongoClientOptions } from 'mongodb'
import { cred,userData,generateUser } from "../schemas/cred.user.js";
import { Observable } from "rxjs";
import dotenv from 'dotenv'

dotenv.config()

const checkUserApi = (userCredentials: cred) => {
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } as MongoClientOptions);
    client.connect(async err => {
      if (err) suscriber.error(err.name + ' ' + err.message)
      const collection = client.db(process.env.DB_API).collection(process.env.DB_COLLECTION_API);
      await collection.findOne({
        $and: [{ username: userCredentials.username, pwd: userCredentials.pwd }]
      })
        .catch((err) => suscriber.error(err))
        .then((value) => suscriber.next(value))
        .finally(() => {
          client.close().finally(() => {
            suscriber.complete();
          })
        })
    });

  })
};

const checkUser = (userCredentials: cred) => {
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } as MongoClientOptions);
    client.connect(async err => {
      if (err) suscriber.error(err.name + ' ' + err.message)
      const collection = client.db(process.env.DB_API).collection(process.env.DB_COLLECTION_API);
      await collection.findOne({
         username: userCredentials.username, pwd: userCredentials.pwd 
      })
        .catch((err) => suscriber.error(err))
        .then((value) => suscriber.next(value))
        .finally(() => {
          client.close().finally(() => {
            suscriber.complete();
          })
        })
    });

  })
};

const saveDataUser = (userInfo:userData) => {
  return new Observable((suscriber)=>{
    const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } as MongoClientOptions);
    client.connect(async err => {
      if (err) suscriber.error(err.name + ' ' + err.message)
      const collection = client.db(process.env.DB_API).collection(process.env.DB_COLLECTION_API);
      let user
      await generateUser(userInfo)
      .then((value) => user = value)
      .catch((err)=> suscriber.error(err))

      await collection.insertOne({user})
        .catch((err) => suscriber.error(err))
        .then((value) => suscriber.next(value))
        .finally(() => {
          client.close().finally(() => {
            suscriber.complete();
          })
        })
    });
  })
}

const saveDataApiUser = (userInfo:userData) => {
  return new Observable((suscriber)=>{
    const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } as MongoClientOptions);
    client.connect(async err => {
      if (err) suscriber.error(err.name + ' ' + err.message)
      const collection = client.db(process.env.DB_API).collection(process.env.DB_COLLECTION_API);
      let user
      await generateUser(userInfo)
      .then((value) => user = value)
      .catch((err)=> suscriber.error(err))

      await collection.insertOne({user})
        .catch((err) => suscriber.error(err))
        .then((value) => suscriber.next(value))
        .finally(() => {
          client.close().finally(() => {
            suscriber.complete();
          })
        })
    });
  })
}

export {checkUserApi,checkUser,saveDataApiUser}


