require("dotenv").config();

import { init } from "./utils/dogehouse";
import { cache } from "./utils/database";

const main = async () => {
  try {
    const wrapper = await init();
    await cache();
    console.log("Done!");
  } catch (e) {
    if (e.code === 4001) console.error("invalid token!");
    console.error(e);
    process.exit();
  }
};

main();
