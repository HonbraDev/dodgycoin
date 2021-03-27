import { Wrapper } from "./dogehouse/index";

export default async function getUserFromID(tag: string, wrapper: Wrapper) {
  const user = await wrapper.query.getUserProfile(tag);
  if (user) return user;
  throw "Unknown user.";
}
