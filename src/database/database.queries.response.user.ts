// import { Observable } from "rxjs";
// import { FriendRequest } from "../schemas/cred.user.js";
// import { Request } from "express";
//import mongoClient from "../services/client.service.js";

// const sendResponse = (req: Request): Observable<boolean> => {
//   const userRequest = req.body as FriendRequest;
//   return new Observable((suscriber) => {
//     const client = mongoClient
//     client.connect(async (err) => {
//       if (err) suscriber.error(err.name + " " + err.message);
//       const collection = client
//         .db(process.env.DB_REGISTER)
//         .collection(process.env.DB_COLLECTION_REGISTERED);

//       const userid = userRequest.to;
//       await collection
//         .updateOne(
//           { "user.userid": userid },
//           { $push: { "user.friendRequest": userRequest } }
//         )
//         .then((updateResponse) => {
//           if (updateResponse.acknowledged.valueOf()) suscriber.next(true);
//         })
//         .catch((err) => {
//           suscriber.error(err.message + " " + err.name);
//         })
//         .finally(() => {
//           client.close().finally(() => {
//             suscriber.complete();
//           });
//         });
//     });
//   });
// };

// export default sendResponse;
