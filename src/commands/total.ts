import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

const total = async ({ userId }: CommandInput) => {
  addMessageToQueue(
    format(
      "The total command has been disabled due to infrastructure migration."
    ),
    [userId, ...honbraIDs]
  );
};

export { total };
