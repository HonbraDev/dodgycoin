import { CommandInput } from "../typings/CommandInput";
import { getUser } from "../utils/database";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

export async function monies({ wrapper, msg, userId }: CommandInput) {
  if (msg.tokens[1]) {
    const username = msg.tokens[1].v;
    if (typeof username === "string") {
      const user = await wrapper.query.getUserProfile(username);
      if (user) {
        const economyUser = await getUser(user.id);
        addMessageToQueue(
          [
            {
              t: "text",
              v: `${user.username} has ${economyUser.monies}`,
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
          [userId, user.id, ...honbraIDs]
        );
      } else {
        addMessageToQueue(
          [
            {
              t: "text",
              v: "The user does not exist or is not in this room.",
            },
          ],
          [userId, ...honbraIDs]
        );
      }
    } else {
      addMessageToQueue(
        [{ t: "text", v: "Invalid command syntax." }],
        [userId, ...honbraIDs]
      );
    }
  } else {
    const user = await getUser(userId);
    addMessageToQueue(
      [
        {
          t: "text",
          v: `You have ${user.monies}`,
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
  }
}
