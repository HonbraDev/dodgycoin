import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";
import honbraIds from "../utils/honbraIDs";

export async function yeet({ wrapper, userId, msg }: CommandInput) {
  try {
    if (typeof msg.tokens[1] !== "undefined") {
      const roomUsers = await wrapper.query.getRoomUsers();
      const isMod = (roomUsers.users.filter((user) => user.id === userId)[0]
        .roomPermissions as { isMod: boolean }).isMod;
      if (isMod || honbraIds.includes(userId)) {
        const userTag = msg.tokens[1].v as string;
        const userProfile = await wrapper.query.getUserProfile(userTag);
        if (userProfile) {
          await wrapper.mutation.setListener(userProfile.id);
        } else
          addMessageToQueue(
            [
              {
                t: "text",
                v: "I'm sorry, but I couldn't find that user.",
              },
            ],
            { userId, wrapper }
          );
      } else
        addMessageToQueue(
          [
            {
              t: "text",
              v: "I'm sorry, but you don't have the permission to do this.",
            },
          ],
          { userId, wrapper }
        );
    } else {
      wrapper.mutation.setListener(userId);
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }]);
  }
}
