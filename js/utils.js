import {DESCRIPTIONS, COMMENTS, NAMES, SURNAMES} from './const.js';

const usedCommentId = new Set();

export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getUniqueRandom = (usedSet, min, max, errorMessage) => {
  let value;
  do {
    value = getRandomInteger(min, max);
    if (usedSet.size >= max) {
      throw new Error(errorMessage);
    }
  } while (usedSet.has(value));
  usedSet.add(value);
  return value;
};

const getCommentMessage = () => {
  const messages = [];
  const usedMessages = [];
  const messageAmount = getRandomInteger(1, 2);
  for (let i = 1; i <= messageAmount; i++) {
    let newMessage = COMMENTS[getRandomInteger(0, (COMMENTS.length - 1))];
    if(usedMessages.includes(newMessage)) {
      newMessage = COMMENTS[getRandomInteger(0, (COMMENTS.length - 1))];
    }
    usedMessages.push(newMessage);
    messages.push(newMessage);
  }
  return messages.join(' ');
};


const getCommentName = (name, surname) => {
  const randomName = name[getRandomInteger(0, (name.length - 1))];
  const randomSurname = surname[getRandomInteger(0, (surname.length - 1))];
  return `${randomName} ${randomSurname}`;
};

const generateComment = () => {
  let comment;
  const id = getUniqueRandom(usedCommentId, 1, 750, 'Не могу найти уникальный ID комментария после 750 попыток');

  comment = {
    commentId: id,
    commentUrl: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    commentMessage: getCommentMessage(),
    commentName: getCommentName(NAMES, SURNAMES)
  };

  return comment
};

const comments = (amount) => {
  const createdComments = [];
  for (let i = 0; i < amount; i++) {
    createdComments.push(generateComment());
  }
  return createdComments;
};

const photoDescription = (id, url) => ({
  id: id,
  url: url,
  description: DESCRIPTIONS[getRandomInteger(0, (DESCRIPTIONS.length - 1))],
  likes: getRandomInteger(15, 200),
  comment: comments(getRandomInteger(1, 30))
});

const uploadedPhotos = (amount) => {
  const usedId = new Set();
  const usedUrl = new Set();
  const allPhotos = [];
  let url;

  for (let i = 0; i < amount; i++) {
    const id = getUniqueRandom (usedId, 1, amount,`Не могу найти уникальный ID после ${amount} попыток`);

    const urlNumber = getUniqueRandom(usedUrl, 1, amount, `Не могу найти уникальный URL после ${amount} попыток`);
    url = `photos/${urlNumber}.jpg`;
    allPhotos.push(photoDescription(id, url));
  }
  return allPhotos;
};

export { uploadedPhotos };
