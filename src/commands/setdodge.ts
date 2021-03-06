import { CommandInput } from "../typings/CommandInput";
import { setMoney } from "../utils/supabase";
import { addMessageToQueue } from "../utils/queue";
import honbraIds from "../utils/honbraIDs";
import honbraIDs from "../utils/honbraIDs";
import { format } from "doge-utils";
import { wrapper } from "../utils/dogehouse";

const setdodge = async ({ msg, userId }: CommandInput) => {
  if (honbraIds.includes(userId)) {
    const username = msg.tokens[1].v;
    const monies = parseInt(msg.tokens[2].v as string, 10);
    if (typeof username === "string" && typeof monies === "number") {
      const theUser = await wrapper.query.getUserProfile(username);
      if (theUser) {
        const id = theUser.id;
        if (id) {
          await setMoney(id, monies);
          addMessageToQueue(
            format(
              `Set ${theUser.username}'s balance to ${monies} Ð.`
            ),
            [userId, theUser.id, ...honbraIDs]
          );
        }
      }
    }
  }
};

export { setdodge };
