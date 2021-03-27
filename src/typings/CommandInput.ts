import { Wrapper, Message } from "@dogehouse/kebab";

export type CommandInput = {
  wrapper: Wrapper;
  userId: string;
  msg: Message;
};
