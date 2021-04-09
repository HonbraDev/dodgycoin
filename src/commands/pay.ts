import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { getUser, setMonies } from "../utils/database";
import { wrapper } from "../utils/dogehouse";
import honbraIDs from "../utils/honbraIDs";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

export async function pay({ msg, userId }: CommandInput) {
  try {
    const input = await parseInput(["user", "number"], msg.tokens),
      // @ts-expect-error
      receiver: string = input[0],
      // @ts-expect-error
      amount: number = input[1],
      [senderDB, receiverDB, receiverProfile] = await Promise.all([
        getUser(userId),
        getUser(receiver),
        wrapper.query.getUserProfile(receiver),
      ]);

    if (!receiverProfile)
      throw "Could not find that user on DogeHouse. Much sad.";

    if (senderDB.monies >= amount) {
      await Promise.all([
        setMonies(userId, senderDB.monies - amount),
        setMonies(receiver, receiverDB.monies + amount),
      ]);
      addMessageToQueue(
        format(
          `${msg.username} sent ${amount} :dodgycoin:  to ${receiverProfile.username}.`
        ),
        [userId, receiverProfile.id, ...honbraIDs]
      );
    } else
      addMessageToQueue(
        format(`You don't have enough :dodgycoin: . Much sad.`),
        [userId, ...honbraIDs]
      );
  } catch (error) {
    console.log(error);
    addMessageToQueue(format(error), [userId, ...honbraIDs]);
  }
}
// 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
