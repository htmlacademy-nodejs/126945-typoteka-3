`use strict`;

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../../utils`);
const {ExitCode} = require(`../../../constants`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_ANNOUNCES_PATH = `./data/announces.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const MILLISEC_IN_DAY = 24 * 60 * 60 * 1000;
const LIMIT_OF_POSTS = 1000;

const readDataFromFile = async (pathToFile) => {
  try {
    const data = await fs.readFile(pathToFile, `utf8`);
    return data.trim().split(`\n`).map(el => el.trim()).filter(el => el.length > 0);
  } catch (e) {
    console.error(chalk.red(`Ошибка при чтении файла`));
    console.error(chalk.red(e));
    process.exit(ExitCode.failure);
  }
};

const getRandomCreatedDate = () => {
  const today = new Date() - 0;
  const threeMonthEarlier = today - 90 * MILLISEC_IN_DAY;
  return new Date(getRandomInt(threeMonthEarlier, today));
};

const generatePost = (titles, announces, categories) => {
  return {
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomCreatedDate(),
    announce: shuffle(announces).slice(0, getRandomInt(1, 5)).join(` `),
    fullText: shuffle(announces).slice(0, getRandomInt(1, announces.length)).join(` `),
    сategory: categories[getRandomInt(0, categories.length - 1)]
  };
};

const generatePosts = async (count) => {

  const titles = await readDataFromFile(FILE_TITLES_PATH);
  const announces = await readDataFromFile(FILE_ANNOUNCES_PATH);
  const categories = await readDataFromFile(FILE_CATEGORIES_PATH);

  return Array(count).fill({}).map(() => generatePost(titles, announces, categories));
};

module.exports = {
  name: `--generate`,
  async run(count) {

    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (count > LIMIT_OF_POSTS) {
      console.error(chalk.red(`Не больше ${LIMIT_OF_POSTS} публикаций`));
      process.exit(ExitCode.failure);
    }

    const posts = JSON.stringify(await generatePosts(count));

    try {
      await fs.writeFile(FILE_NAME, posts);
      console.log(chalk.green(`Файл mock.json успешно создан.`));
      process.exit(ExitCode.success);
    } catch (e) {
      console.error(chalk.red(`Не могу создать файл...`));
      console.error(chalk.red(e));
      process.exit(ExitCode.failure);
    }
  }
};
