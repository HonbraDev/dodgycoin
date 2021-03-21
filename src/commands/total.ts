import { CommandInput } from "../commandTools/CommandInput";
import getUserFromTag from "../getUserFromTag";
import { getAllUsers } from "../totallyARealDB";
import { addMessageToQueue } from "../queue";

export async function total({ userId, wrapper }: CommandInput) {
  const allUsers = getAllUsers();
  const allMonies = allUsers.map((user: { monies: number }) => user.monies);
  let totalMonies = 0;
  allMonies.forEach((monies: number) => (totalMonies += monies));
  addMessageToQueue(
    [
      { t: "text", v: `There is a total of ${totalMonies}` },
      { t: "emote", v: "DodgyCoin" },
      { t: "text", v: "in circulation." },
    ],
    { userId, wrapper }
  );
}
