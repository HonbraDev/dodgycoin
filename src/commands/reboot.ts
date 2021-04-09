import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { wrapper } from "../utils/dogehouse";
import honbraIds from "../utils/honbraIDs";

export async function reboot({ userId }: CommandInput) {
  if (honbraIds.includes(userId)) {
    await wrapper.mutation.sendRoomChatMsg(format("Rebooting."));
    process.exit();
  }
}
