// @ts-nocheck because internet is unpredictable

import { Connection } from "./raw";
import {
  MessageToken,
  Room,
  UUID,
  Message,
  UserList,
  Wrapper,
  UserList,
} from "./entities";
import {
  GetScheduledRoomsResponse,
  GetTopPublicRoomsResponse,
  JoinRoomAndGetInfoResponse,
} from "./responses";

type Handler<Data> = (data: Data) => void;

export const wrap = (connection: Connection): Wrapper => ({
  connection,
  subscribe: {
    newChatMsg: (handler: Handler<{ userId: UUID; msg: Message }>) =>
      connection.addListener("new_chat_msg", handler),
  },
  query: {
    getTopPublicRooms: (cursor = 0): Promise<GetTopPublicRoomsResponse> =>
      connection.fetch("get_top_public_rooms", { cursor }),
    getUserProfile: (
      idOrUsername: string
    ): Promise<UserWithFollowInfo | null> =>
      connection.fetch("get_user_profile", { userId: idOrUsername }),
    getScheduledRooms: (
      cursor: "" | number = "",
      getOnlyMyScheduledRooms = false
    ): Promise<GetScheduledRoomsResponse> =>
      connection.fetch("get_scheduled_rooms", {
        cursor,
        getOnlyMyScheduledRooms,
      }),
    getRoomUsers: async (): Promise<UserList> =>
      connection.fetch(
        "get_current_room_users",
        {},
        "get_current_room_users_done"
      ),
  },
  mutation: {
    joinRoomAndGetInfo: (
      roomId: string
    ): Promise<JoinRoomAndGetInfoResponse | { error: string }> =>
      connection.fetch("join_room_and_get_info", { roomId }),
    speakingChange: (value: boolean) =>
      connection.send(`speaking_change`, { value }),
    follow: (userId: string, value: boolean): Promise<void> =>
      connection.fetch("follow", { userId, value }),
    sendRoomChatMsg: (
      ast: MessageToken[],
      whisperedTo: string[] = []
    ): Promise<void> =>
      connection.send("send_room_chat_msg", { tokens: ast, whisperedTo }),
    setMute: (isMuted: boolean): Promise<Record<string, never>> =>
      connection.fetch("mute", { value: isMuted }),
    leaveRoom: (): Promise<{ roomId: UUID }> =>
      connection.fetch("leave_room", {}, "you_left_room"),
    createRoom: (data: {
      name: string;
      privacy: string;
      description: string;
    }): Promise<{ error: string } | { room: Room }> =>
      connection.fetch("create_room", data),
    editRoom: (data: {
      name: string;
      privacy: string;
      description: string;
    }): Promise<{ error: string } | { room: Room }> =>
      connection.fetch("edit_room", data),
  },
});
