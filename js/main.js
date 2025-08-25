const descriptionBase = ['Тяжелый день на болоте. Заказ пиццы – единственная активность на вечер.',
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
  'Лягушечковое настроение: сонное'];
const commentBase = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const namesBase = [
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
const surnamesBase = [
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
function getRandom (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
const getId = (min, max) => getRandom(min, max);

const getUrl = (min, max) => `photos/${getRandom(min, max)}.jpg`;
const getDescription = () => descriptionBase[getRandom(0, (descriptionBase.length - 1))];
const getLikesAmount = (min, max) => getRandom(min, max);
const getCommentAmount = (min, max) => getRandom(min, max);
const getCommentId = (min, max) => getRandom(min, max);
const getCommentAvatar = (min, max) => `img/avatar-${getRandom(min, max)}.svg`;
function getCommentMessage() {
  let message = [];
  let usedMessages = [];
  const messageAmount = getRandom(1, 2);
  for (let i = 1; i <= messageAmount; i++) {
    let newMessage = commentBase[getRandom(0, (commentBase.length - 1))];
    if(usedMessages.includes(newMessage)) {
      newMessage = commentBase[getRandom(0, (commentBase.length - 1))];
    }
    usedMessages.push(newMessage);
    message.push(newMessage);
  }
  return message.join(' ');
}
function getCommentName(name, surname) {
  let randomName = name[getRandom(0, (name.length - 1))];
  let randomSurname = surname[getRandom(0, (surname.length - 1))];
  return `${randomName} ${randomSurname}`;
}

function generateComment () {
  const comment = [];
  const usedCommentId = new Set ();
    let id;
    let attempts = 0;
    do {
      id = getCommentId(1, 750);
      attempts++;
    } while (usedCommentId.has(id) && attempts < 750);
    usedCommentId.add(id);

    comment.push({
      commentId: id,
      commentAvatar: getCommentAvatar(1, 6),
      commentMessage: getCommentMessage(),
      commentName: getCommentName(namesBase, surnamesBase)
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
    description: getDescription(),
    likes: getLikesAmount(15, 200),
    comment: Comments(getCommentAmount (1, 30))
  }
}
const UploadedPhotos = (amount) => {
  const usedId = new Set ();
  const usedUrl = new Set ();
  const allPhotos = [];

  for (let i = 0; i < amount; i++) {
    let id;
    let idAttempts = 0;
    do {
      id = getId(1, amount);
      idAttempts++;
      if (usedId.length >= amount) {
        throw new Error(`Не могу найти уникальный ID после ${amount} попыток`);
      }
    } while (usedId.has(id));
    usedId.add(id);

    let url;
    let urlAttempts = 0;
    do {
      url = getUrl(1, amount);
      urlAttempts++;
      if (usedUrl.length >= amount) {
        throw new Error(`Не могу найти уникальный URL после ${amount} попыток`);
      }
    } while (usedUrl.has(url));
    usedUrl.add(url);

    allPhotos.push(photoDescription(id, url));
  }
  return allPhotos;
}

console.log(UploadedPhotos(10));
