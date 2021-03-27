import { CommandInput } from "../commandTools/CommandInput";
import parseInput from "../commandTools/parseInput";
import { addMessageToQueue } from "../queue";
import { getUser, setMonies } from "../totallyARealDB";

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
            } the coinflip. You now have ${dbUserUpdated.monies} DodgyCoins.`,
          },
        ],
        { userId, wrapper }
      );
    } else throw "You don't have enough DodgyCoin.";
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }], { userId, wrapper });
  }
}
