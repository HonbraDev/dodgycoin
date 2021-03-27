import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";
import parseInput from "../utils/parseInput";
import honbraIds from "../utils/honbraIDs";

export async function jam({ msg, wrapper, userId }: CommandInput) {
  if (honbraIds.includes(userId)) {
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
