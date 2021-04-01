import { CommandInput } from "../typings/CommandInput";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

export async function testcmd({ msg, wrapper, userId }: CommandInput) {
  try {
    const input = await parseInput([], msg.tokens, wrapper);
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }], [userId]);
  }
}
