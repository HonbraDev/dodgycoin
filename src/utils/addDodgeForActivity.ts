import { wrapper } from "./dogehouse";
import logger from "./logger";
import { addMoney } from "./supabase";

const addDodgeForActivity = async () => {
  try {
    logger("Incrementing users' monies", true);
    const users = (await wrapper.query.getRoomUsers()).users.map(
      (user) => user.id
    );
    for (let i = 0; i < users.length; i++) {
      try {
        await addMoney(users[i], 1);
      } catch (e) {
        console.error(e);
      }
    }
    logger("Done incrementing", true);
  } catch (e) {
    console.error(e);
  }
};

export default addDodgeForActivity;
