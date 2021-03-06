import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { getUser } from "../utils/supabase";
import { wrapper } from "../utils/dogehouse";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

const monies = async ({ msg, userId }: CommandInput) => {
  if (msg.tokens[1]) {
    const username = msg.tokens[1].v;
    if (typeof username === "string") {
      const user = await wrapper.query.getUserProfile(username);
      if (user) {
        const economyUser = await getUser(user.id);
        addMessageToQueue(
          format(
            `${user.username} has ${economyUser.money} Ð. Such monies.`
          ),
          [userId, user.id, ...honbraIDs]
        );
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
    const user = await getUser(userId);
    addMessageToQueue(
      format(`You have ${user.money} Ð. Such monies.`),
      [userId, ...honbraIDs]
    );
  }
};

export { monies };
