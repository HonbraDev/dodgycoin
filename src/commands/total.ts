import { CommandInput } from "../typings/CommandInput";
import honbraIDs from "../utils/honbraIDs";
import { addMessageToQueue } from "../utils/queue";

export async function total({ userId }: CommandInput) {
  /* const allUsers = getAllUsers();
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
  ); */
  addMessageToQueue(
    [
      {
        t: "text",
        v: `The total command has been disabled due to infrastructure migration.`,
      },
    ],
    [userId, ...honbraIDs]
  );
}
