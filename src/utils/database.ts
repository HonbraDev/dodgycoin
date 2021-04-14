import { User } from "../typings/Database";
import * as admin from "firebase-admin";
import { wrapper } from "./dogehouse";

const serviceAccount = require("../../firebaseadmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://dodgycoin-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.database();

const getUser = (id: string) => {
  return new Promise<User>((resolve) =>
    db.ref(`users/${id}`).once("value", (snap) => {
      if (snap.exists()) {
        cacheUser(id);
        resolve(snap.val() as User);
      } else {
        setMonies(id, 0);
      }
    })
  );
};
const setMonies = (id: string, monies: number) => {
  cacheUser(id);
  return new Promise((resolve, reject) =>
    db.ref(`users/${id}/monies`).set(monies).then(resolve).catch(reject)
  );
};

const linkAccount = (dogehouseID: string, githubID: string) => {
  cacheUser(dogehouseID);
  return new Promise((resolve, reject) =>
    db
      .ref(`users/${dogehouseID}/github`)
      .set(githubID)
      .then(resolve)
      .catch(reject)
  );
};

const cacheUser = async (id: string, awaitWrite?: boolean) => {
  const user = await wrapper.query.getUserProfile(id);
  if (user) {
    const { avatarUrl, bio, displayName, id, username } = user;
    awaitWrite
      ? await db
          .ref(`users/${id}/cache`)
          .set({ avatarUrl, bio, displayName, id, username })
      : db
          .ref(`users/${id}/cache`)
          .set({ avatarUrl, bio, displayName, id, username });
  }
};

const cache = () =>
  new Promise((resolve) => {
    db.ref("users").once("value", async (snap) => {
      const ids = Object.keys(snap.val());
      let index = 1;
      for (let id of ids) {
        await cacheUser(id);
        console.log(
          `Cached ${id} (${index}/${ids.length}) (${Math.floor(
            index / ids.length
          ) * 100}%)`
        );
        index++;
      }
      resolve("");
    });
  });

export { getUser, setMonies, linkAccount, cache, cacheUser };
