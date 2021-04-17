import { CommandInput } from "../typings/CommandInput";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";
import honbraIDs from "../utils/honbraIDs";
import { format } from "doge-utils";
import { addMoney, getUser } from "../utils/supabase";

const coinflip = async ({ msg, userId }: CommandInput) => {
  try {
    const input = await parseInput(["number"], msg.tokens),
      // @ts-expect-error
      amount: number = input[0],
      dbUser = await getUser(userId),
      flipResult = Math.random() >= 0.5;
    if (dbUser.money >= amount) {
      await addMoney(userId, flipResult ? amount : 0 - amount);
      const dbUserUpdated = await getUser(userId);
      addMessageToQueue(
        format(
          `You have ${flipResult ? "won" : "lost"} the coinflip. You now have ${
            dbUserUpdated.money
          } Ð. Much ${flipResult ? "wow" : "sad"}.`
        ),
        [userId, ...honbraIDs]
      );
    } else
      addMessageToQueue(
        format(`You don't have enough Ð. Much sad.`),
        [userId, ...honbraIDs]
      );
  } catch (error) {
    console.log(error);
    addMessageToQueue(format(error), [userId, ...honbraIDs]);
  }
};

export { coinflip };
