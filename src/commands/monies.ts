import { CommandInput } from "../commandTools/CommandInput";
import getUserFromTag from "../getUserFromTag";
import { getUser } from "../totallyARealDB";
import { addMessageToQueue } from "../queue";

export async function monies({ wrapper, msg, userId }: CommandInput) {
  if (msg.tokens[1]) {
    const username = msg.tokens[1].v;
    if (typeof username === "string") {
      const user = await getUserFromTag(username, wrapper);
      if (typeof user !== "undefined") {
        const economyUser = getUser(user.id);
        addMessageToQueue(
          [
            {
              t: "text",
              v: `${user.displayName} has ${economyUser.monies}`,
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
          { userId, wrapper }
        );
      } else {
        addMessageToQueue(
          [
            {
              t: "text",
              v: "The user does not exist or is not in this room.",
            },
          ],
          { userId, wrapper }
        );
      }
    } else {
      addMessageToQueue([{ t: "text", v: "Invalid command syntax." }], {
        userId,
        wrapper,
      });
    }
  } else {
    const user = getUser(userId);
    addMessageToQueue(
      [
        {
          t: "text",
          v: `${msg.displayName} has ${user.monies}`,
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
      { userId, wrapper }
    );
  }
}
