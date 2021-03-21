import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { User } from "./realDBTypings";

const adapter = new FileSync("db.json");
const db = low(adapter);

function getUser(id: string): User {
  const user = db
    .get("users")
    // @ts-expect-error
    .find({ id })
    .value();
  if (typeof user != "undefined") {
    return user;
  } else {
    // @ts-expect-error
    db.get("users").push({ id, monies: 0 }).write();
    return (
      db
        .get("users")
        // @ts-expect-error
        .find({ id })
        .value()
    );
  }
}

function isUser(id: string): boolean {
  const user = db
    .get("users")
    // @ts-expect-error
    .find({ id })
    .value();
  if (typeof user != "undefined") return true;
  else return false;
}

function setMonies(id: string, monies: number): void {
  if (monies < 0) monies = 0;
  const user = db
    .get("users")
    // @ts-expect-error
    .find({ id })
    .value();
  if (typeof user != "undefined") {
    db.get("users")
      // @ts-expect-error
      .find({ id })
      .set("monies", monies)
      .write();
  } else {
    // @ts-expect-error
    db.get("users").push({ id, monies }).write();
    return (
      db
        .get("users")
        // @ts-expect-error
        .find({ id })
        .value()
    );
  }
}

function getAllUsers() {
  return db.get("users").value();
}

export { getUser, isUser, setMonies, getAllUsers };
