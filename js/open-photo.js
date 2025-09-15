import './photos.js';
import { container, photosTotal } from './photos.js';

const COMMENTS_ON_SHOW = 5;

const openBigPicture = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const thumbnails = container.querySelectorAll('.picture');
const showMoreComments = openBigPicture.querySelector('.social__comments-loader');

const buttonText = showMoreComments.textContent;
const buttonColor = showMoreComments.style.color;

let currentLoadMoreHandler = null;

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  openBigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', handleEscapeKey);
  closeBigPicture.removeEventListener('click', closeModal);

  if (currentLoadMoreHandler) {
    showMoreComments.removeEventListener('click', currentLoadMoreHandler);
    currentLoadMoreHandler = null;
  }
}

function renderComments(comments, commentList, fragment) {
  comments.forEach(([comment]) => {
    const template = commentList.querySelector('li').cloneNode(true);

    const image = template.querySelector('.social__picture');
    image.alt = comment.commentName;
    image.src = comment.commentUrl;

    const commentText = template.querySelector('.social__text');
    commentText.textContent = comment.commentMessage;

    fragment.appendChild(template);
  });

  return fragment;
}

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {

    if (currentLoadMoreHandler) {
      showMoreComments.removeEventListener('click', currentLoadMoreHandler);
      currentLoadMoreHandler = null;
    }

    document.removeEventListener('keydown', handleEscapeKey);
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
    commentAmount.textContent = thumbnail.querySelector('.picture__comments').textContent;

    const thisPhoto = photosTotal.find((photo) => {
      const bigPictureImg = bigPicture.querySelector('img');
      const bigPictureSrc = bigPictureImg.src;

      return bigPictureSrc.includes(photo.url);
    });

    const thisPhotoComments = thisPhoto.comment;

    if (parseInt(commentAmount.textContent, 10) <= 5) {
      openBigPicture.querySelector('.comments-loader').classList.add('hidden');
      openBigPicture.querySelector('.social__comment-shown-count').textContent = commentAmount.textContent;

      renderComments(thisPhotoComments, commentList, commentFragment);
      commentList.replaceChildren(commentFragment);

    } else {
      openBigPicture.querySelector('.comments-loader').classList.remove('hidden');

      showMoreComments.textContent = buttonText;
      showMoreComments.style.color = buttonColor;
      showMoreComments.disabled = false;
      showMoreComments.style.pointerEvents = '';

      let shownCommentsAmount = COMMENTS_ON_SHOW;

      openBigPicture.querySelector('.social__comment-shown-count').textContent = shownCommentsAmount;

      const restComments = [...thisPhotoComments];
      let showingComments = restComments.splice(0, COMMENTS_ON_SHOW);

      renderComments(showingComments, commentList, commentFragment);

      commentList.replaceChildren(commentFragment);

      // что оно в себя пишет?
      currentLoadMoreHandler = () => {
        if (restComments.length > 0) {
          showingComments = restComments.splice(0, COMMENTS_ON_SHOW);
          shownCommentsAmount += showingComments.length;

          renderComments(showingComments, commentList, commentFragment);

          commentList.append(commentFragment);
          openBigPicture.querySelector('.social__comment-shown-count').textContent = shownCommentsAmount;
        }

        if (restComments.length === 0) {
          showMoreComments.disabled = true;
          showMoreComments.style.pointerEvents = 'none';

          showMoreComments.textContent = 'Все комментарии загружены';
          showMoreComments.style.color = '#C0C0C0';
        }
      };

      showMoreComments.addEventListener('click', currentLoadMoreHandler);
    }

    document.addEventListener('keydown', handleEscapeKey);
    closeBigPicture.addEventListener('click', closeModal);
  });
});
