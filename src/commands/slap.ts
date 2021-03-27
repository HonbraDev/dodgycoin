import { CommandInput } from "../typings/CommandInput";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";

export async function slap({ msg, wrapper, userId }: CommandInput) {
  try {
    const [user] = await parseInput(["string"], msg.tokens, wrapper);
    if (["Honbra", "dodgycoin"].includes(user as string)) {
      addMessageToQueue(
        [
          {
            t: "text",
            v: `What the fuck did you just fucking say about me and my owner, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills.`,
          },
        ],
        { userId, wrapper }
      );
    }
  } catch (error) {}
}
