import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

const help = async ({ userId }: CommandInput) => {
  addMessageToQueue(format("https://dodgycoin.honbra.com/commands"), [
    userId,
    ...honbraIDs,
  ]);
};

export { help };
