import { Wrapper, Room, Message } from "dogehouse-js";

export type CommandInput = {
  wrapper: Wrapper;
  theRoom: Room;
  userId: string;
  msg: Message;
};
