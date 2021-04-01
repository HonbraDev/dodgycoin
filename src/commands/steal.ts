import { CommandInput } from "../typings/CommandInput";
import { getUser, setMonies } from "../utils/database";
import honbraIDs from "../utils/honbraIDs";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

export async function steal({ msg, wrapper, userId }: CommandInput) {
  try {
    if (honbraIDs.includes(userId)) {
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

      if (receiverDB.monies >= amount) {
        await Promise.all([
          setMonies(userId, senderDB.monies + amount),
          setMonies(receiver, receiverDB.monies - amount),
        ]);
        addMessageToQueue(
          [
            { t: "text", v: `${msg.username} stole ${amount}` },
            {
              t: "emote",
              v: "DodgyCoin",
            },
            { t: "text", v: `from ${receiverProfile.username}.` },
          ],
          [userId, receiverProfile.id, ...honbraIDs]
        );
      } else
        addMessageToQueue(
          [
            {
              t: "text",
              v: "They don't have enough",
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
          [userId]
        );
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }], [userId, ...honbraIDs]);
  }
}
// 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
