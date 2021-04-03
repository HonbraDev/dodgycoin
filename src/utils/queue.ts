import { MessageToken, Wrapper, Room, wrap } from "dodgy-kebab";
import { wrapper } from "./dogehouse";

type queueMessage = {
  tokens: MessageToken[];
  whisperedTo?: string[];
};

let messageQueue: queueMessage[] = [];

const addMessageToQueue = (msg: MessageToken[], mention?: string[]) => {
  if (messageQueue.length > 0) {
    mention
      ? messageQueue.push({
          tokens: msg,
          whisperedTo: mention,
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
      mention ? mention : []
    );
  }
};

const startMessageQueue = () => setInterval(() => onInterval(), 1100);

const onInterval = async () => {
  const currentMessage = messageQueue.shift();
  if (currentMessage)
    await wrapper.mutation.sendRoomChatMsg(
      [
        messageQueue.length >= 5
          ? { t: "text", v: `[1 / ${messageQueue.length}]` }
          : { t: "text", v: "" },
        ...currentMessage.tokens,
      ],
      currentMessage.whisperedTo ? currentMessage.whisperedTo : []
    );
};

export { startMessageQueue, addMessageToQueue };
