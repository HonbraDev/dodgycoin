import { CommandInput } from "../typings/CommandInput";
import { Message, UUID, tokensToString } from "@dogehouse/kebab";
import { wrapper } from "./dogehouse";
import logger from "./logger";
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
  steal,
  speak,
  yeet,
} from "./commands";

const chatHandler = ({ userId, msg }: { userId: UUID; msg: Message }) => {
  if (msg.tokens.length > 0) {
    const text = tokensToString(msg.tokens);

    logger(`${msg.username} (${userId}): ${text}`);

    const commandInput: CommandInput = { wrapper, msg, userId };
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
    if (msg.tokens[0].v === "$speak") speak(commandInput);
    if (msg.tokens[0].v === "$yeet") yeet(commandInput);
  }
};

export default chatHandler;
