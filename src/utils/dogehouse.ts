import { raw, wrap, Wrapper } from "../dogehouse/index";
import { readFile } from "fs/promises";
const { connect } = raw;

// @ts-expect-error
let wrapper: Wrapper = null;

const init = async () => {
  let configPath = "./configs/1.json";
  if (process.argv[2]) configPath = `./configs/${process.argv[2]}.json`;
  const {
    token,
    refreshToken,
  }: { token: string; refreshToken: string } = JSON.parse(
    await readFile(configPath, "utf-8")
  );
  const connection = await connect(token, refreshToken, {
    onConnectionTaken: () => {
      console.error("\nAnother client has taken the connection");
      process.exit();
    },
  });
  wrapper = wrap(connection);
  return wrapper;
};

export { init, wrapper };
