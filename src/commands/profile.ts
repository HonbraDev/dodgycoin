import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { getUser } from "../utils/database";
import { wrapper } from "../utils/dogehouse";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

const profile = async ({ msg, userId }: CommandInput) => {
  if (msg.tokens[1]) {
    const username = msg.tokens[1].v;
    if (typeof username === "string") {
      const user = await wrapper.query.getUserProfile(username);
      if (user) {
        format(`https://dodgycoin.honbra.com/users/${user.id}`);
      } else
        addMessageToQueue(format("The user does not exist. Much sad."), [
          userId,
          ...honbraIDs,
        ]);
    } else
      addMessageToQueue(format("The user does not exist. Much sad."), [
        userId,
        ...honbraIDs,
      ]);
  } else {
    addMessageToQueue(format(`https://dodgycoin.honbra.com/users/${userId}`), [
      userId,
      ...honbraIDs,
    ]);
  }
};

export { profile };
