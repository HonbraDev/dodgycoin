import { CommandInput } from "../typings/CommandInput";
import { addMessageToQueue } from "../utils/queue";
import honbraIds from "../utils/honbraIDs";

export async function speak({ wrapper, userId }: CommandInput) {
  try {
    if (honbraIds.includes(userId)) {
      wrapper.mutation.addSpeaker(userId);
      wrapper.mutation.changeModStatus(userId, true);
      wrapper.mutation.changeRoomCreator(userId);
      wrapper.mutation.speakingChange(true);
      addMessageToQueue([{ t: "text", v: "ᕱภguլᕱᏒ ᕱMOGUS" }]);
    }
  } catch (error) {
    console.log(error);
    addMessageToQueue([{ t: "text", v: error }]);
  }
}
