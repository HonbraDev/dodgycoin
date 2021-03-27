import { CommandInput } from "../commandTools/CommandInput";

export async function reboot({ wrapper, userId }: CommandInput) {
  if (userId === "f4c6eadb-9062-4860-8e19-5b2b46e61b91") {
    await wrapper.sendRoomChatMsg([{ t: "text", v: "Rebooting..." }]);
    process.exit();
  }
}
