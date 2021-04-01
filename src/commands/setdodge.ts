import { CommandInput } from "../typings/CommandInput";
import { setMonies } from "../utils/database";
import { addMessageToQueue } from "../utils/queue";
import honbraIds from "../utils/honbraIDs";
import honbraIDs from "../utils/honbraIDs";

export async function setdodge({ wrapper, msg, userId }: CommandInput) {
  if (honbraIds.includes(userId)) {
    const username = msg.tokens[1].v;
    const monies = parseInt(msg.tokens[2].v as string, 10);
    if (typeof username === "string" && typeof monies === "number") {
      const theUser = await wrapper.query.getUserProfile(username);
      if (theUser) {
        const id = theUser.id;
        if (id) {
          await setMonies(id, monies);
          addMessageToQueue(
            [
              {
                t: "text",
                v: `Set ${theUser.username}'s balance to ${monies}`,
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
            [userId, theUser.id, ...honbraIDs]
          );
        }
      }
    }
  }
}
