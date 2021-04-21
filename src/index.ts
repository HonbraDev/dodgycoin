require("dotenv").config();

import { init } from "./utils/dogehouse";
import { startMessageQueue, addMessageToQueue } from "./utils/queue";
import addDodgeForActivity from "./utils/addDodgeForActivity";
import chatHandler from "./utils/chatHandler";
import { format } from "doge-utils";
import logger from "./utils/logger";
import { User } from "@dogehouse/kebab";
import honbraIDs from "./utils/honbraIDs";

const main = async () => {
  try {
    const wrapper = await init();

    const rooms = await wrapper.query.getTopPublicRooms();
    let theRoom = rooms.rooms[0].id;
    if (process.argv[3]) theRoom = process.argv[3];

    console.log(`Joining ${theRoom}.`);
    const roomInfo = await wrapper.query.joinRoomAndGetInfo(theRoom);
    if ("error" in roomInfo) throw roomInfo.error;
    console.log(
      `Joined ${roomInfo.room.name}. There ${
        roomInfo.room.numPeopleInside > 1 ? "are" : "is"
      } ${roomInfo.room.numPeopleInside} participant${
        roomInfo.room.numPeopleInside > 1 ? "s" : ""
      }.`
    );

    startMessageQueue();

    addMessageToQueue(
      format(
        "Overlisted should have used `$help` instead of throwing bricks at people."
      )
    );

    wrapper.subscribe.newChatMsg(chatHandler);
    wrapper.subscribe.userJoinRoom(({ user }: { user: User }) => {
      if (user.username === "benawad")
        addMessageToQueue(
          format(
            "CHAT WHEN BENAWAD: :monkaSTEER: :pepeMeltdown: :OOOO: :monkaSTEER: :pepeMeltdown: :OOOO: :Pepega: :monkaSTEER: :pepeMeltdown: :OOOO: :Pepega: :monkaSTEER: :pepeMeltdown: :OOOO: :Pepega: :monkaSTEER: :pepeMeltdown: :OOOO: :Pepega: "
          )
        );
      if (honbraIDs.includes(user.id))
        addMessageToQueue(
          format("Hey, dumbass. Your bot still hasn't crashed... yet..."),
          [user.id]
        );
    });

    setInterval(addDodgeForActivity, 60000);
  } catch (e) {
    if (e.code === 4001) logger("Invalid token.");
    logger(e);
    process.exit();
  }
};

main();
