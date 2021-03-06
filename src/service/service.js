`use strict`;

const chalk = require(`chalk`);
const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND, ExitCode} = require(`../../constants`);

const args = process.argv.slice(2);
const [command, argument] = args;

if (command && !Cli[command]) {
  console.log(chalk.red(`Вызвана неизвестная команда.`));
  process.exit(ExitCode.failure);
}

Cli[command || DEFAULT_COMMAND].run(argument);
