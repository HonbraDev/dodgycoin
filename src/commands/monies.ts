import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import { getUser } from "../utils/database";
import { wrapper } from "../utils/dogehouse";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

export async function monies({ msg, userId }: CommandInput) {
  if (msg.tokens[1]) {
    const username = msg.tokens[1].v;
    if (typeof username === "string") {
      const user = await wrapper.query.getUserProfile(username);
      if (user) {
        const economyUser = await getUser(user.id);
        addMessageToQueue(
          format(
            `${user.username} has ${economyUser.monies} :dodgycoin: . Such monies.`
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
      format(`You have ${user.monies} :dodgycoin: . Such monies.`),
      [userId, ...honbraIDs]
    );
  }
}
