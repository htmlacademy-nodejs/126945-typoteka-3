`use strict`;

const {ExitCode} = require(`../../../constants`);
const packageJSON = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.log(packageJSON.version);
    process.exit(ExitCode.success);
  }
};
