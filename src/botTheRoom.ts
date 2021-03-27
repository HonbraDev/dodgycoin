import { getUser, setMonies } from "./totallyARealDB";
import { Message, Wrapper, Room } from "dogehouse-js";
import { CommandInput } from "./commandTools/CommandInput";
import {
  coinflip,
  help,
  monies,
  pay,
  setdodge,
  jam,
  reboot,
  total,
  slap,
  steal
} from "./commands";
import { startMessageQueue, addMessageToQueue } from "./queue";

const botTheRoom = async (wrapper: Wrapper, theRoom: Room): Promise<void> => {
  console.log(
    `=> joining room "${theRoom.name}" (${theRoom.numPeopleInside} people)`
  );
  await wrapper.joinRoom(theRoom.id);

  startMessageQueue({ wrapper, theRoom });

  addMessageToQueue([
    {
      t: "text",
      v: "Hello, I am DodgyCoin, your personal banker. Try doing $help.",
    },
  ]);

  wrapper.listenForChatMsg(
    async ({ userId, msg }: { userId: string; msg: Message }) => {
      const text = msg.tokens.map((token) => token.v).join(" ");
      console.log(`${msg.displayName}: ${text}`);
      const commandInput: CommandInput = { wrapper, theRoom, msg, userId };
      if (["bbcd9b89-dd64-49f7-8612-49a333b6249b"].includes(userId)) return;

      if (msg.tokens[0].v === "$help") help(commandInput);
      if (msg.tokens[0].v === "$jam") jam(commandInput);
      if (msg.tokens[0].v === "$monies") monies(commandInput);
      if (msg.tokens[0].v === "$setdodge") setdodge(commandInput);
      if (msg.tokens[0].v === "$pay") pay(commandInput);
      if (msg.tokens[0].v === "$coinflip") coinflip(commandInput);
      if (msg.tokens[0].v === "$reboot") reboot(commandInput);
      if (msg.tokens[0].v === "$total") total(commandInput);
      if (msg.tokens[0].v === "!slap") slap(commandInput);
      if (msg.tokens[0].v === "!yeet") slap(commandInput);
      if (msg.tokens[0].v === "$steal") steal(commandInput);
    }
  );

  const addDodgeForActivity = async () => {
    console.log("Incrementing users' monies");
    const users = await (await wrapper.getRoomUsers()).users.map(
      (user) => user.id
    );
    users.forEach((id) => {
      const user = getUser(id);
      setMonies(id, user.monies + 1);
    });
    console.log("Done incrementing");
  };

  setInterval(addDodgeForActivity, 60000);
};

export default botTheRoom;
