import { Wrapper } from "./dogehouse/index";

export default async function getUserFromTag(tag: string, wrapper: Wrapper) {
  const user = await wrapper.query.getUserProfile(tag);
  if (user) return user;
  throw "Unknown user.";
}
