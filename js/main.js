const DESCRIPTION = [
  'Тяжелый день на болоте. Заказ пиццы – единственная активность на вечер.',
  'Этот вазон сам бросился под меня. Я лишь попытался его спасти.',
  'Моё лицо, когда ты в третий раз рассказываешь эту историю.',
  'Моментальный снимок моей продуктивности. Она только что была здесь.',
  'Мама, можно мы возьмём того блестящего жука? – Мама: У нас дома есть блестящие жуки. Блестящие жуки дома: пачка скрепок.',
  'План был безупречен. Исполнение – не очень. Но печенье того стоило.',
  'Когда пытаешься эффектно уйти, но спотыкаешься о собственную крутость.',
  'Окак.',
  'Моё отношение к вашему ЗОЖ. Где мои макароны с сыром?',
  'Енот ушёл в себя. Вернётся с добычей.',
  'Енот видит еду. Енот хочет еду. Енот применяет стратегию «увидел-украл-убежал».',
  'Я не будильник, чтобы квакать по утрам',
  'Лягушечковое настроение: сонное'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Василий',
  'Иннокентий',
  'Семён',
  'Акакий',
  'Федот',
  'Кузьма',
  'Порфирий',
  'Евлампий',
  'Прокофий',
  'Захар',
  'Афанасий',
  'Терентий',
  'Спиридон',
  'Архип',
  'Геннадий'
];

const SURNAMES = [
  'Пукин',
  'Хрюндель',
  'Помидоров',
  'Шпунтиков',
  'Кастрюлькин',
  'Шпроткин',
  'Тапкоходов',
  'Воробушкин',
  'Картофелин',
  'Мухоморов',
  'Пузырёв',
  'Чайников',
  'Блинчиков',
  'Огурцов',
  'Тапочкин'
];

const usedCommentId = new Set ();

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getUniqueRandom (usedSet, min, max, errorMessage) {
  let value;
  do {
    value = getRandomInteger(min, max);
    if (usedSet.size >= max) {
      throw new Error(errorMessage);
    }
  } while (usedSet.has(value));
  usedSet.add(value);
  return value;
}

function getCommentMessage() {
  let message = [];
  let usedMessages = [];
  const messageAmount = getRandomInteger(1, 2);
  for (let i = 1; i <= messageAmount; i++) {
    let newMessage = COMMENTS[getRandomInteger(0, (COMMENTS.length - 1))];
    if(usedMessages.includes(newMessage)) {
      newMessage = COMMENTS[getRandomInteger(0, (COMMENTS.length - 1))];
    }
    usedMessages.push(newMessage);
    message.push(newMessage);
  }
  return message.join(' ');
}

function getCommentName(name, surname) {
  let randomName = name[getRandomInteger(0, (name.length - 1))];
  let randomSurname = surname[getRandomInteger(0, (surname.length - 1))];
  return `${randomName} ${randomSurname}`;
}

function generateComment () {
  const comment = [];
    const id = getUniqueRandom(usedCommentId, 1, 750, `Не могу найти уникальный ID комментария после 750 попыток`);

    comment.push({
      commentId: id,
      commentUrl: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      commentMessage: getCommentMessage(),
      commentName: getCommentName(NAMES, SURNAMES)
    });

  return comment;
}

const Comments = (amount) => {
  let commentBatch = [];
  for (let i = 0; i < amount; i++) {
    commentBatch.push(generateComment());
  }
  return commentBatch;
}

function photoDescription (id, url) {

  return {
    id: id,
    url: url,
    description: DESCRIPTION[getRandomInteger(0, (DESCRIPTION.length - 1))],
    likes: getRandomInteger(15, 200),
    comment: Comments(getRandomInteger(1, 30))
  }
}

const UploadedPhotos = (amount) => {
  const usedId = new Set ();
  const usedUrl = new Set ();
  const allPhotos = [];
  let url;

  for (let i = 0; i < amount; i++) {
    const id = getUniqueRandom (usedId, 1, amount,`Не могу найти уникальный ID после ${amount} попыток`);

    const urlNumber = getUniqueRandom(usedUrl, 1, amount, `Не могу найти уникальный URL после ${amount} попыток`);
    url = `photos/${urlNumber}.jpg`;
    allPhotos.push(photoDescription(id, url));
  }
  return allPhotos;
}

console.log(UploadedPhotos(25));
