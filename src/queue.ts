import { MessageToken, Wrapper, Room } from "./dogehouse/index";
import getUserFromID from "./getUserFromID";

type queueMessage = {
  tokens: MessageToken[];
  whisperedTo?: string;
};

let messageQueue: queueMessage[] = [];

export async function addMessageToQueue(
  msg: MessageToken[],
  mention?: { userId: string; wrapper: Wrapper }
) {
  mention
    ? messageQueue.push({
        tokens: msg,
        whisperedTo: (await getUserFromID(mention.userId, mention.wrapper))
          .id as string,
      })
    : messageQueue.push({ tokens: msg });
}

export function startMessageQueue(input: {
  wrapper: Wrapper;
  theRoom: Room;
}): void {
  setInterval(() => {
    onInterval(input);
  }, 1100);
}

function onInterval({ wrapper }: { wrapper: Wrapper; theRoom: Room }) {
  const currentMessage = messageQueue.shift();
  if (currentMessage)
    wrapper.mutation.sendRoomChatMsg(
      [
        messageQueue.length >= 5
          ? { t: "text", v: `[1 / ${messageQueue.length}]` }
          : { t: "text", v: "" },
        ...currentMessage.tokens,
      ],
      currentMessage.whisperedTo ? [currentMessage.whisperedTo] : []
    );
}
