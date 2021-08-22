`use strict`;

const chalk = require(`chalk`);
const {ExitCode} = require(`../../../constants`);
const packageJSON = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.log(chalk.blue(packageJSON.version));
    process.exit(ExitCode.success);
  }
};
