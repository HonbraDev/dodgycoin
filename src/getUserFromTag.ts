import { Wrapper } from "dogehouse-js";

export default async function getUserFromTag(tag: string, wrapper: Wrapper) {
  const theUser = await (await wrapper.getRoomUsers()).users.filter(
    (user) => user.username === tag
  )[0];
  return theUser;
}
