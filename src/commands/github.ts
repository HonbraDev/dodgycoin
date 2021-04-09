import { CommandInput } from "../typings/CommandInput";
import honbraIDs from "../utils/honbraIDs";
import { format } from "doge-utils";
import { addMessageToQueue } from "../utils/queue";

export async function github({ userId }: CommandInput) {
  addMessageToQueue(
    format(
      "I am open-source! You can find my code at https://github.com/honbradev/dodgycoin. Such code."
    ),
    [userId, ...honbraIDs]
  );
}
