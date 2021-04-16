import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { getUser, addMoney } from "../utils/supabase";
import { wrapper } from "../utils/dogehouse";
import honbraIDs from "../utils/honbraIDs";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

const steal = async ({ msg, userId }: CommandInput) => {
  try {
    if (honbraIDs.includes(userId)) {
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

      if (receiverDB.money >= amount) {
        await Promise.all([
          addMoney(userId, amount),
          addMoney(receiver, 0 - amount),
        ]);
        addMessageToQueue(
          format(
            `${receiverProfile.username} sent ${amount} :dodgycoin: to ${msg.username}.`
          ),
          [userId, receiverProfile.id, ...honbraIDs]
        );
      } else
        addMessageToQueue(
          format(`They don't have enough :dodgycoin: . Much sad.`),
          [userId, ...honbraIDs]
        );
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue(format(error), [userId, ...honbraIDs]);
  }
};

export { steal };
