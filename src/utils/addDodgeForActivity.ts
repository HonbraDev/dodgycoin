import { wrapper } from "./dogehouse";
import logger from "./logger";
import { addMoney } from "./supabase";

const addDodgeForActivity = async () => {
  logger("Incrementing users' monies", true);
  const users = (await wrapper.query.getRoomUsers()).users.map(
    (user) => user.id
  );
  for (let i = 0; i < users.length; i++) {
    await addMoney(users[i], 1);
  }
  logger("Done  incrementing", true);
};

export default addDodgeForActivity;
