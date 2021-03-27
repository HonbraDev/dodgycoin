import { MessageToken, Wrapper, Room } from "./dogehouse/index";
import getUserFromID from "./getUserFromID";

let messageQueue: MessageToken[][] = [];
let messageInterval: NodeJS.Timeout = setInterval(() => {}, 1000);

export async function addMessageToQueue(
  msg: MessageToken[],
  mention?: { userId: string; wrapper: Wrapper }
) {
  mention
    ? messageQueue.push([
        {
          t: "mention",
          v: (await getUserFromID(mention.userId, mention.wrapper)).username,
        },
        ...msg,
      ])
    : messageQueue.push(msg);
}

export function startMessageQueue(input: {
  wrapper: Wrapper;
  theRoom: Room;
}): void {
  clearInterval(messageInterval);
  setInterval(() => {
    onInterval(input);
  }, 1100);
}

function onInterval({ wrapper }: { wrapper: Wrapper; theRoom: Room }) {
  const currentMessage = messageQueue.shift();
  if (currentMessage)
    wrapper.mutation.sendRoomChatMsg([
      messageQueue.length >= 5
        ? { t: "text", v: `[1 / ${messageQueue.length}]` }
        : { t: "text", v: "" },
      ...currentMessage,
    ]);
}
