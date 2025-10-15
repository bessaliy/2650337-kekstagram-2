import { photoTemplate, errorTemplate } from './templates.js';
import {getData, Method, Route, ErrorText} from './api.js';

export const container = document.querySelector('.pictures');
const photosTotal = [];

const COMMENTS_ON_SHOW = 5;

const openBigPicture = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const showMoreComments = openBigPicture.querySelector('.social__comments-loader');

const showDataError = (method) => {

  const errorElement = errorTemplate.content.cloneNode(true);
  errorElement.querySelector('h2').textContent = ErrorText[method];

  document.body.appendChild(errorElement);

  setTimeout(() => {
    const errorSection = document.querySelector('.data-error');
    if (errorSection) {
      errorSection.remove();
    }
  }, 5000);
};

export const renderPhotos = (picture) => {
  const template = photoTemplate.cloneNode(true);
  const image = template.querySelector('.picture__img');
  const fragment = document.createDocumentFragment();

  template.photoData = picture;
  image.alt = picture.description;
  image.src = picture.url;

  template.querySelector('.picture__likes').textContent = picture.likes;
  template.querySelector('.picture__comments').textContent = picture.comments.length;

  fragment.appendChild(template);

  template.addEventListener('click', () => {
    onClickOpenModal(template);
  });
  container.append(fragment);
};

let onCurrentLoadMoreHandler = null;
let photosData = [];

export const getPhotosData = () => photosData;

export const onLoadRenderPhotos = async () => {
  try {
    photosData = await getData(Route.GET_DATA, Method.GET);
    photosData.forEach((picture) => {

      renderPhotos(picture);
      photosTotal.push(picture);

    });
  } catch (error) {
    showDataError(Method.GET);
  }
};

document.addEventListener('DOMContentLoaded', onLoadRenderPhotos);

const onHandleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

const changeEventListeners = (action) => {
  const method = `${action}EventListener`;
  document[method]('keydown', onHandleEscapeKey);
  closeBigPicture[method]('click', closeModal);
};

function closeModal() {
  openBigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  changeEventListeners('remove');

  if (onCurrentLoadMoreHandler) {
    showMoreComments.removeEventListener('click', onCurrentLoadMoreHandler);
    onCurrentLoadMoreHandler = null;
  }
}

const renderComments = (comments, commentList, fragment) => {
  comments.forEach((comment) => {
    const template = commentList.querySelector('li').cloneNode(true);

    const image = template.querySelector('.social__picture');
    image.alt = comment.name;
    image.src = comment.avatar;

    const commentText = template.querySelector('.social__text');
    commentText.textContent = comment.message;

    fragment.appendChild(template);
  });
  return fragment;
};
export function onClickOpenModal(thumbnail) {
  if (onCurrentLoadMoreHandler) {
    showMoreComments.removeEventListener('click', onCurrentLoadMoreHandler);
    onCurrentLoadMoreHandler = null;
  }

  document.removeEventListener('keydown', onHandleEscapeKey);
  closeBigPicture.removeEventListener('click', closeModal);

  const commentAmount = openBigPicture.querySelector('.social__comment-total-count');
  const commentList = openBigPicture.querySelector('.social__comments');
  const commentFragment = document.createDocumentFragment();

  openBigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPicture.querySelector('img').src = thumbnail.querySelector('img').src;
  bigPicture.querySelector('img').alt = thumbnail.querySelector('img').alt;

  openBigPicture.querySelector('.likes-count').textContent = thumbnail.querySelector('.picture__likes').textContent;
  openBigPicture.querySelector('.social__caption').textContent = thumbnail.querySelector('img').alt;

  const thisPhotoComments = thumbnail.photoData.comments;

  commentAmount.textContent = thisPhotoComments.length.toString();

  if (thisPhotoComments.length <= 5) { //Показываем 5 комментов
    openBigPicture.querySelector('.comments-loader').classList.add('hidden');
    openBigPicture.querySelector('.social__comment-shown-count').textContent = commentAmount.textContent;

    renderComments(thisPhotoComments, commentList, commentFragment);
    commentList.replaceChildren(commentFragment);

  } else {
    openBigPicture.querySelector('.comments-loader').classList.remove('hidden');

    let shownCommentsAmount = COMMENTS_ON_SHOW;

    openBigPicture.querySelector('.social__comment-shown-count').textContent = shownCommentsAmount;

    const restComments = [...thisPhotoComments];
    let showingComments = restComments.splice(0, COMMENTS_ON_SHOW);

    renderComments(showingComments, commentList, commentFragment);

    commentList.replaceChildren(commentFragment);

    onCurrentLoadMoreHandler = () => {
      if (restComments.length > 0) {
        showingComments = restComments.splice(0, COMMENTS_ON_SHOW);
        shownCommentsAmount += showingComments.length;

        renderComments(showingComments, commentList, commentFragment);

        commentList.append(commentFragment);
        openBigPicture.querySelector('.social__comment-shown-count').textContent = shownCommentsAmount;
      }

      if (restComments.length === 0) {
        showMoreComments.classList.add('hidden');
      }
    };

    showMoreComments.addEventListener('click', onCurrentLoadMoreHandler);
  }
  changeEventListeners('add');
}
