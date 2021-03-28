import { getUser, setMonies } from "./database";
import { wrapper } from "./dogehouse";
import logger from "./logger";

const addDodgeForActivity = async () => {
  logger("Incrementing users' monies", true);
  const users = (await wrapper.query.getRoomUsers()).users.map(
    (user) => user.id
  );
  for (let i = 0; i < users.length; i++) {
    const user = await getUser(users[i]);
    await setMonies(users[i], user.monies + 1);
  }
  logger("    Done  incrementing    ", true);
};

export default addDodgeForActivity;
