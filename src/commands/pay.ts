import { CommandInput } from "../typings/CommandInput";
import { getUser, setMonies } from "../utils/database";
import honbraIDs from "../utils/honbraIDs";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

export async function pay({ msg, wrapper, userId }: CommandInput) {
  try {
    const input = await parseInput(["user", "number"], msg.tokens, wrapper),
      // @ts-expect-error
      receiver: string = input[0],
      // @ts-expect-error
      amount: number = input[1],
      [senderDB, receiverDB, receiverProfile] = await Promise.all([
        getUser(userId),
        getUser(receiver),
        wrapper.query.getUserProfile(receiver),
      ]);

    if (!receiverProfile) throw "Could not find that user on DogeHouse.";

    if (senderDB.monies >= amount) {
      await Promise.all([
        setMonies(userId, senderDB.monies - amount),
        setMonies(receiver, receiverDB.monies + amount),
      ]);
      addMessageToQueue(
        [
          { t: "text", v: `${msg.username} sent ${amount}` },
          {
            t: "emote",
            v: "DodgyCoin",
          },
          { t: "text", v: `to ${receiverProfile.username}.` },
        ],
        [userId, receiverProfile.id, ...honbraIDs]
      );
    } else
      addMessageToQueue(
        [
          {
            t: "text",
            v: "You don't have enough",
          },
          {
            t: "emote",
            v: "DodgyCoin",
          },
          {
            t: "text",
            v: ".",
          },
        ],
        [userId, ...honbraIDs]
      );
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }], [userId, ...honbraIDs]);
  }
}
// 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
