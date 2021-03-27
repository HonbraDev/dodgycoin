import { Wrapper, Message } from "../dogehouse/index";

export type CommandInput = {
  wrapper: Wrapper;
  userId: string;
  msg: Message;
};
