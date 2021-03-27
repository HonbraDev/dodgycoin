import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";

export function help({ wrapper, userId }: CommandInput) {
  addMessageToQueue(
    [
      {
        t: "text",
        v:
          "DodgyCoin help: $monies ?<user> - check your balance | $pay <user> <amount> - pay your mates | $coinflip <amount> - flip a coin for <amount> DodgyCoin and potentially win | Creator's Discord is Honbra#7537",
      },
    ],
    { userId, wrapper }
  );
}
