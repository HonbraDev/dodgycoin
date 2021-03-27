import { CommandInput } from "../commandTools/CommandInput";
import honbraIds from "../honbraIDs";

export async function reboot({ wrapper, userId }: CommandInput) {
  if (honbraIds.includes(userId)) {
    await wrapper.mutation.sendRoomChatMsg([{ t: "text", v: "Rebooting..." }]);
    process.exit();
  }
}
