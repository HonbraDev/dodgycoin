import { CommandInput } from "../typings/CommandInput";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";
import { getUser, setMonies } from "../utils/database";
import honbraIDs from "../utils/honbraIDs";

export async function coinflip({ msg, userId, wrapper }: CommandInput) {
  try {
    const input = await parseInput(["number"], msg.tokens, wrapper),
      // @ts-expect-error
      amount: number = input[0],
      dbUser = await getUser(userId),
      flipResult = Math.random() >= 0.5;
    if (dbUser.monies >= amount) {
      await setMonies(
        userId,
        flipResult ? dbUser.monies + amount : dbUser.monies - amount
      );
      const dbUserUpdated = await getUser(userId);
      addMessageToQueue(
        [
          {
            t: "text",
            v: `You have ${
              flipResult ? "won" : "lost"
            } the coinflip. You now have ${dbUserUpdated.monies}`,
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
    addMessageToQueue([{ t: "text", v: error }], [userId]);
  }
}
