import { Wrapper } from "dogehouse-js";

export default async function getUserFromID(tag: string, wrapper: Wrapper) {
  const theUser = await (await wrapper.getRoomUsers()).users.filter(
    (user) => user.id === tag
  )[0];
  return theUser;
}
