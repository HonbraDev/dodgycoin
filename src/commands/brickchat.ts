import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";
import honbraIds from "../utils/honbraIDs";

export async function brickchat({ wrapper, userId }: CommandInput) {
  try {
    if (honbraIds.includes(userId)) {
      wrapper.mutation.sendRoomChatMsg([
        {
          t: "text",
          v: "Bricking chat in 10 seconds, use $reboot to stop me.",
        },
      ]);
      setTimeout(
        () =>
          // @ts-expect-error
          wrapper.mutation.sendRoomChatMsg([{ t: "text", v: "text" }], "brick"),
        10000
      );
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }]);
  }
}
