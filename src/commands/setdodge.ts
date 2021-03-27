import { CommandInput } from "../commandTools/CommandInput";
import getUserFromTag from "../getUserFromTag";
import { setMonies } from "../totallyARealDB";
import { addMessageToQueue } from "../queue";

export async function setdodge({ wrapper, msg, userId }: CommandInput) {
  if (userId === "f4c6eadb-9062-4860-8e19-5b2b46e61b91") {
    const username = msg.tokens[1].v;
    const monies = parseInt(msg.tokens[2].v as string, 10);
    if (typeof username === "string" && typeof monies === "number") {
      const theUser = await getUserFromTag(username, wrapper);
      if (typeof theUser !== "undefined") {
        const id = theUser.id;
        if (id) {
          await setMonies(id, monies);
          addMessageToQueue([
            { t: "text", v: "Set the balance of" },
            { t: "mention", v: theUser.username },
            { t: "text", v: `to ${monies}` },
            {
              t: "emote",
              v: "DodgyCoin",
            },
            {
              t: "text",
              v: ".",
            },
          ]);
        }
      }
    }
  }
}
