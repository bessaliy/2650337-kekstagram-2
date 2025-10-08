import {DESCRIPTION, COMMENTS, NAMES, SURNAMES} from './const.js';

const usedCommentId = new Set();

export function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export function getUniqueRandom (usedSet, min, max, errorMessage) {
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

const comments = (amount) => {
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
    comment: comments(getRandomInteger(1, 30))
  }
}

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
}

export { uploadedPhotos };
