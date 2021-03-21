import { CommandInput } from "../commandTools/CommandInput";
import parseInput from "../commandTools/parseInput";
import { addMessageToQueue } from "../queue";

export async function testcmd({ msg, wrapper }: CommandInput) {
  try {
    const input = await parseInput([], msg.tokens, wrapper);
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }]);
  }
}
