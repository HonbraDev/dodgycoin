import { CommandInput } from "../typings/CommandInput";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";
import { getUser, setMonies } from "../utils/database";
import honbraIDs from "../utils/honbraIDs";
import { wrapper } from "../utils/dogehouse";
import { format } from "doge-utils";

export async function coinflip({ msg, userId }: CommandInput) {
  try {
    const input = await parseInput(["number"], msg.tokens),
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
        format(
          `You have ${flipResult ? "won" : "lost"} the coinflip. You now have ${
            dbUserUpdated.monies
          } :dodgycoin: . Much wow.`
        ),
        [userId, ...honbraIDs]
      );
    } else
      addMessageToQueue(
        format(`You don't have enough :dodgycoin: . Much sad.`),
        [userId, ...honbraIDs]
      );
  } catch (error) {
    console.log(error);
    addMessageToQueue(format(error), [userId]);
  }
}
