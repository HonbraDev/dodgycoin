require("dotenv").config();

import { init } from "./utils/dogehouse";
import { startMessageQueue, addMessageToQueue } from "./utils/queue";
import addDodgeForActivity from "./utils/addDodgeForActivity";
import chatHandler from "./utils/chatHandler";

const main = async () => {
  try {
    const wrapper = await init();

    const rooms = await wrapper.query.getTopPublicRooms();
    let theRoom = rooms.rooms[0].id;
    if (process.argv[3]) theRoom = process.argv[3];

    console.log(`Joining ${theRoom}.`);
    const roomInfo = await wrapper.mutation.joinRoomAndGetInfo(theRoom);
    if ("error" in roomInfo) throw roomInfo.error;
    console.log(
      `Joined ${roomInfo.room.name}. There ${
        roomInfo.room.numPeopleInside > 1 ? "are" : "is"
      } ${roomInfo.room.numPeopleInside} participant${
        roomInfo.room.numPeopleInside > 1 ? "s" : ""
      }.`
    );

    startMessageQueue();

    /* addMessageToQueue([
      {
        t: "text",
        v:
          "Hello, I am DodgyCoin, your personal banker. I no longer brick rooms. Try doing $help.",
      },
    ]); */

    wrapper.subscribe.newChatMsg(chatHandler);

    setInterval(addDodgeForActivity, 60000);
  } catch (e) {
    if (e.code === 4001) console.error("invalid token!");
    console.error(e);
    process.exit();
  }
};

main();
