import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { wrapper } from "../utils/dogehouse";
import honbraIds from "../utils/honbraIDs";

const reboot = async ({ userId }: CommandInput) => {
  if (honbraIds.includes(userId)) {
    await wrapper.mutation.sendRoomChatMsg(format("Rebooting."));
    process.exit();
  }
};

export { reboot };
