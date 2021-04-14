import { User } from "../typings/Database";
import * as admin from "firebase-admin";

const serviceAccount = require("../../firebaseadmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://dodgycoin-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.database();

const getUser = (id: string) =>
  new Promise<User>((resolve) =>
    db.ref(`users/${id}`).once("value", (snap) => {
      if (snap.exists()) {
        resolve(snap.val() as User);
      } else {
        resolve({ monies: 0 });
      }
    })
  );

const setMonies = (id: string, monies: number) =>
  new Promise((resolve, reject) =>
    db.ref(`users/${id}/monies`).set(monies).then(resolve).catch(reject)
  );

const linkAccount = (dogehouseID: string, githubID: string) =>
  new Promise((resolve, reject) =>
    db
      .ref(`users/${dogehouseID}/github`)
      .set(githubID)
      .then(resolve)
      .catch(reject)
  );

export { getUser, setMonies, linkAccount };
