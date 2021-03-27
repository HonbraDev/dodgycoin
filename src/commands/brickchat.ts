import { CommandInput } from "../commandTools/CommandInput";
import { addMessageToQueue } from "../queue";
import honbraIds from "../honbraIDs";

export async function testcmd({ wrapper, userId }: CommandInput) {
  try {
    if (honbraIds.includes(userId)) {
      // @ts-expect-error
      wrapper.mutation.sendRoomChatMsg([], "brick");
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }]);
  }
}
