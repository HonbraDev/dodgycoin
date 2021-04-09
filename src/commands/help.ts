import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

export function help({ userId }: CommandInput) {
  addMessageToQueue(
    format(
      "DodgyCoin help: $monies ?<user> - check your balance | $pay <user> <amount> - pay your mates | $coinflip <amount> - flip a coin for <amount> DodgyCoin and potentially win | $github - GitHub link"
    ),
    [userId, ...honbraIDs]
  );
}
