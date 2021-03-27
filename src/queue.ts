import { MessageToken, Wrapper, Room, wrap } from "./dogehouse/index";
import getUserFromID from "./getUserFromID";

type queueMessage = {
  tokens: MessageToken[];
  whisperedTo?: string;
};

let messageQueue: queueMessage[] = [],
  // @ts-expect-error
  wrapper: Wrapper = null;

export async function addMessageToQueue(
  msg: MessageToken[],
  mention?: { userId: string; wrapper: Wrapper }
) {
  if (messageQueue.length > 0) {
    mention
      ? messageQueue.push({
          tokens: msg,
          whisperedTo: mention.userId,
        })
      : messageQueue.push({ tokens: msg });
  } else {
    wrapper.mutation.sendRoomChatMsg(
      [
        messageQueue.length >= 5
          ? { t: "text", v: `[1 / ${messageQueue.length}]` }
          : { t: "text", v: "" },
        ...msg,
      ],
      mention?.userId ? [mention.userId] : []
    );
  }
}

export function startMessageQueue(input: { wrapper: Wrapper }): void {
  wrapper = input.wrapper;
  setInterval(() => {
    onInterval(input);
  }, 1100);
}

function onInterval({ wrapper }: { wrapper: Wrapper }) {
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
