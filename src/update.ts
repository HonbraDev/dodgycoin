import { exec } from "child_process";
import chalk from "chalk";

exec("git pull", (error, stdout, stderr) => {
  if (error) return console.error(chalk.red(error));
  if (stderr) return console.error(chalk.red(stderr));
  if (stdout === "Already up to date.\n")
    return console.log("Already up to date.");

  exec("npm run build", (error, stdout, stderr) => {
    if (error) return console.error(chalk.red(error));
    if (stderr) return console.error(chalk.red(stderr));

    console.log(chalk.green("Updated successfully."));
  });
});
