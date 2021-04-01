import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";
import honbraIds from "../utils/honbraIDs";
import honbraIDs from "../utils/honbraIDs";

export async function speak({ wrapper, userId, msg }: CommandInput) {
  /* try {
    if (typeof msg.tokens[1] !== "undefined") {
      const roomUsers = await wrapper.query.getRoomUsers();
      const isMod = (roomUsers.users.filter((user) => user.id === userId)[0]
        .roomPermissions as { isMod: boolean }).isMod;
      if (isMod || honbraIds.includes(userId)) {
        const userTag = msg.tokens[1].v as string;
        const userProfile = await wrapper.query.getUserProfile(userTag);
        if (userProfile) {
          await wrapper.mutation.addSpeaker(userProfile.id);
        } else throw "I'm sorry, but I couldn't find that user.";
      } else throw "I'm sorry, but you don't have the permission to do this.";
    } else {
      wrapper.mutation.addSpeaker(userId);
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }], [userId, ...honbraIDs]);
  } */
  addMessageToQueue(
    [
      {
        t: "text",
        v:
          "Sorry, but this command is disabled, because DogeHouse snorted 3g of crack cocaine again.",
      },
    ],
    [userId, ...honbraIDs]
  );
}
