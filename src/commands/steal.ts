import { CommandInput } from "../commandTools/CommandInput";
import getUserFromTag from "../getUserFromTag";
import { getUser, setMonies } from "../totallyARealDB";
import parseInput from "../commandTools/parseInput";
import { addMessageToQueue } from "../queue";
import honbraIds from "../honbraIDs";

export async function steal({ msg, wrapper, userId }: CommandInput) {
  try {
    if (honbraIds.includes(userId)) {
      const input = await parseInput(["user", "number"], msg.tokens, wrapper),
        // @ts-expect-error
        reciever: string = input[0],
        // @ts-expect-error
        amount: number = input[1],
        [senderDB, recieverDB] = await Promise.all([
          getUser(userId),
          getUser(reciever),
        ]);

      if (recieverDB.monies >= amount) {
        await Promise.all([
          setMonies(userId, senderDB.monies + amount),
          setMonies(reciever, recieverDB.monies - amount),
        ]);

        addMessageToQueue([{ t: "text", v: "Transaction successful." }], {
          userId,
          wrapper,
        });
      } else throw "They don't have enough DodgyCoin.";
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }], { userId, wrapper });
  }
}
// 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
