import { CommandInput } from "../commandTools/CommandInput";
import getUserFromTag from "../getUserFromTag";
import { getUser, setMonies } from "../totallyARealDB";
import { addMessageToQueue } from "../queue";

export async function reboot({ wrapper, msg, userId }: CommandInput) {
  console.log("recieved request, verifying user");
  if (userId === "f4c6eadb-9062-4860-8e19-5b2b46e61b91") {
    await wrapper.sendRoomChatMsg([{ t: "text", v: "Rebooting..." }]);
    process.exit();
  }
}
