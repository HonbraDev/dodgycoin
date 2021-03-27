require("dotenv").config();

import { raw, wrap } from "dogehouse-js";
const { connect } = raw;
import botTheRoom from "./botTheRoom";

const main = async () => {
  try {
    const connection = await connect(
      process.env.DOGEHOUSE_TOKEN as string,
      process.env.DOGEHOUSE_REFRESH_TOKEN as string,
      {
        onConnectionTaken: () => {
          console.error("\nAnother client has taken the connection");
          process.exit();
        },
      }
    );
    const wrapper = wrap(connection);

    const rooms = await wrapper.getTopPublicRooms();
    let theRoom = rooms[0];

    await botTheRoom(wrapper, theRoom);
  } catch (e) {
    if (e.code === 4001) console.error("invalid token!");
  }
};

main();
