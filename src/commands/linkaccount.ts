import { format } from "doge-utils";
import { CommandInput } from "../typings/CommandInput";
import parseInput from "../utils/parseInput";
import { addMessageToQueue } from "../utils/queue";
import { Octokit } from "@octokit/rest";
import { linkAccount } from "../utils/supabase";
import honbraIDs from "../utils/honbraIDs";

const octokit = new Octokit();

const linkaccount = async ({ msg, userId }: CommandInput) => {
  try {
    const input = await parseInput(["string"], msg.tokens),
      // @ts-expect-error
      githubName: string = input[0];

    const user = await octokit.users.getByUsername({ username: githubName });

    if (user) {
      await linkAccount(userId, user.data.id.toString());
      addMessageToQueue(
        format(`Linked ${user.data.name} with ${msg.username}. Yay`),
        [userId, ...honbraIDs]
      );
    } else throw "No user found.";
  } catch (error) {
    addMessageToQueue(format(error), [userId, ...honbraIDs]);
  }
};

export { linkaccount };
