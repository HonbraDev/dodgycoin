import { CommandInput } from "../typings/CommandInput";
import { Message, UUID, tokensToString } from "@dogehouse/kebab";
import logger from "./logger";
import * as cmd from "./commands";

const chatHandler = ({ userId, msg }: { userId: UUID; msg: Message }) => {
  if (msg.tokens.length === 0) return;
  const text = tokensToString(msg.tokens);
  logger(`${msg.username} (${userId}): ${text}`);
  if (["bbcd9b89-dd64-49f7-8612-49a333b6249b"].includes(userId)) return;

  const commandInput: CommandInput = { msg, userId };

  if (msg.tokens[0].v === "$help") cmd.help(commandInput);
  if (msg.tokens[0].v === "$monies") cmd.monies(commandInput);
  if (msg.tokens[0].v === "$setdodge") cmd.setdodge(commandInput);
  if (msg.tokens[0].v === "$pay") cmd.pay(commandInput);
  if (msg.tokens[0].v === "$coinflip") cmd.coinflip(commandInput);
  if (msg.tokens[0].v === "$reboot") cmd.reboot(commandInput);
  if (msg.tokens[0].v === "$total") cmd.total(commandInput);
  if (msg.tokens[0].v === "$steal") cmd.steal(commandInput);
  if (msg.tokens[0].v === "$speak") cmd.speak(commandInput);
  if (msg.tokens[0].v === "$yeet") cmd.yeet(commandInput);
  if (msg.tokens[0].v === "$github") cmd.github(commandInput);
  if (msg.tokens[0].v === "$linkaccount") cmd.linkaccount(commandInput);
  if (msg.tokens[0].v === "$unlinkaccount") cmd.unlinkaccount(commandInput);
  if (msg.tokens[0].v === "$profile") cmd.profile(commandInput);
};

export default chatHandler;
