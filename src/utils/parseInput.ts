import { MessageToken, Wrapper } from "../dogehouse/index";

const parseInput = async (
  types: InputTypes[],
  tokens: MessageToken[],
  wrapper: Wrapper
) => {
  let output: (string | number)[] = [];
  tokens.shift();
  for (let i = 0; i < types.length; i++) {
    const currentType = types[i];
    if (tokens[i]) {
      const currentToken = tokens[i].v as string;
      switch (currentType) {
        case "string":
          output.push(currentToken);
          continue;
        case "number": {
          let potentialNumber = +currentToken;
          if (isNaN(potentialNumber)) throw "Invalid number in command.";
          if (potentialNumber < 1) throw "Invalid number in command.";
          output.push(Math.floor(potentialNumber));
          continue;
        }
        case "user": {
          const potentialUser = await wrapper.query.getUserProfile(
            currentToken
          );
          if (!potentialUser) throw "Invalid user in command.";
          output.push(potentialUser.id);
          continue;
        }
      }
    } else throw "Missing argument in command.";
  }
  return output;
};

type InputTypes = "string" | "number" | "user";

export default parseInput;
