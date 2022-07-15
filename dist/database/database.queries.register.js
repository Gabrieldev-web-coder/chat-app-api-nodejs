import { MongoClient } from "mongodb";
const CheckUserInDatabase = (dbUrl, dbName, collectionName, username, userpassword) => {
    const MongoDB = new MongoClient(dbUrl)
        .db(dbName)
        .collection(collectionName)
        .findOne({ username: username, password: userpassword }, (err, result) => {
        if (err)
            console.log(err);
        console.log(result);
    });
};
//# sourceMappingURL=database.queries.register.js.map