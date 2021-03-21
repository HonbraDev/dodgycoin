import { CommandInput } from "../commandTools/CommandInput";
import getUserFromTag from "../getUserFromTag";
import { getUser, setMonies } from "../totallyARealDB";
import { addMessageToQueue } from "../queue";
import parseInput from "../commandTools/parseInput";

export async function jam({ msg, wrapper, userId }: CommandInput) {
  if (userId === "f4c6eadb-9062-4860-8e19-5b2b46e61b91") {
    try {
      const input = await parseInput(["string"], msg.tokens, wrapper),
        // @ts-expect-error
        msgToParse: string = input[0];
      addMessageToQueue(JSON.parse(msgToParse));
    } catch (error) {
      console.log(error);
      addMessageToQueue([{ t: "text", v: error }], { userId, wrapper });
    }
  }
}
