import { Wrapper, Message } from "dodgy-kebab";

export type CommandInput = {
  wrapper: Wrapper;
  userId: string;
  msg: Message;
};
