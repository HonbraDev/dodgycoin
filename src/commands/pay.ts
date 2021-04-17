import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { getUser, addMoney } from "../utils/supabase";
import { wrapper } from "../utils/dogehouse";
import honbraIDs from "../utils/honbraIDs";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

const pay = async ({ msg, userId }: CommandInput) => {
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

    if (senderDB.money >= amount) {
      await Promise.all([
        addMoney(userId, 0 - amount),
        addMoney(receiver, amount),
      ]);
      addMessageToQueue(
        format(
          `${msg.username} sent ${amount} Ð to ${receiverProfile.username}.`
        ),
        [userId, receiverProfile.id, ...honbraIDs]
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

export { pay };
