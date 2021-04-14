import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";
import { linkAccount } from "../utils/database";
import honbraIDs from "../utils/honbraIDs";

const unlinkaccount = async ({ msg, userId }: CommandInput) => {
  try {
    await linkAccount(userId, "");
    addMessageToQueue(format(`Unlinked ${msg.username}. Yay`), [
      userId,
      ...honbraIDs,
    ]);
  } catch (error) {
    addMessageToQueue(format(error), [userId, ...honbraIDs]);
  }
};

export { unlinkaccount };
