`use strict`;

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../../utils`);
const {ExitCode} = require(`../../../constants`);

const DEFAULT_COUNT = 1;

const FILE_NAME = `mock.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const ANNOUNCE = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const MILLISEC_IN_DAY = 24 * 60 * 60 * 1000;
const LIMIT_OF_POSTS = 1000;

const getRandomCreatedDate = () => {
  const today = new Date() - 0;
  const threeMonthEarlier = today - 90 * MILLISEC_IN_DAY;
  return new Date(getRandomInt(threeMonthEarlier, today));
};

const generatePost = () => {
  return {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomCreatedDate(),
    announce: shuffle(ANNOUNCE).slice(0, getRandomInt(1, 5)).join(` `),
    fullText: shuffle(ANNOUNCE).slice(0, getRandomInt(1, ANNOUNCE.length)).join(` `),
    сategory: CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]
  };
};

const gereneratePosts = (count) => {
  return Array(count).fill({}).map(() => generatePost());
};

module.exports = {
  name: `--generate`,
  async run(count) {

    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (count > LIMIT_OF_POSTS) {
      console.error(chalk.red(`Не больше ${LIMIT_OF_POSTS} публикаций`));
      process.exit(ExitCode.failure);
    }

    const posts = JSON.stringify(gereneratePosts(count));

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
