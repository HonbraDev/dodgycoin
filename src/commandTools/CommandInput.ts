import { Wrapper, Room, Message } from "../dogehouse/index";

export type CommandInput = {
  wrapper: Wrapper;
  theRoom: Room;
  userId: string;
  msg: Message;
};
