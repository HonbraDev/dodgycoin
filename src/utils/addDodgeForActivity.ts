import { getUser, setMonies } from "./database";
import { wrapper } from "./dogehouse";

const addDodgeForActivity = async () => {
  console.log("Incrementing users' monies");
  const users = (await wrapper.query.getRoomUsers()).users.map(
    (user) => user.id
  );
  for (let i = 0; i < users.length; i++) {
    const user = await getUser(users[i]);
    await setMonies(users[i], user.monies + 1);
  }
  console.log("Done incrementing");
};

export default addDodgeForActivity;
