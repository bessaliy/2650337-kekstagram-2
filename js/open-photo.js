import './photos.js';
import { container, photosTotal } from './photos.js';

const openBigPicture = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const thumbnails = container.querySelectorAll('.picture');
const showMoreComments = openBigPicture.querySelector('.social__comments-loader');

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
}

function renderComments(comments, commentList, fragment) {
  comments.forEach(([comment]) => {
    const template = commentList.querySelector('li').cloneNode(true);

    const image = template.querySelector('.social__picture');
    image.alt = comment.commentName;
    image.src = comment.commentUrl;

    let commentText = template.querySelector('.social__text');
    commentText.textContent = comment.commentMessage;

    fragment.appendChild(template);
  });

  return fragment;
}

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
    document.removeEventListener('keydown', handleEscapeKey);
    closeBigPicture.removeEventListener('click', closeModal);

    let commentAmount = openBigPicture.querySelector('.social__comment-total-count');
    let commentList = openBigPicture.querySelector('.social__comments');
    const commentFragment = document.createDocumentFragment();

    openBigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    bigPicture.querySelector('img').src = thumbnail.querySelector('img').src;
    bigPicture.querySelector('img').alt = thumbnail.querySelector('img').alt;

    openBigPicture.querySelector('.likes-count').textContent = thumbnail.querySelector('.picture__likes').textContent;
    openBigPicture.querySelector('.social__caption').textContent = thumbnail.querySelector('img').alt;
    commentAmount.textContent = thumbnail.querySelector('.picture__comments').textContent;

    const thisPhoto = photosTotal.find(function(photo) {

      const bigPictureImg = bigPicture.querySelector('img');
      const bigPictureSrc = bigPictureImg.src;

      return bigPictureSrc.includes(photo.url);
    });

    const thisPhotoComments = thisPhoto.comment;

    if (parseInt(commentAmount.textContent, 10) <= 5) {
      openBigPicture.querySelector('.comments-loader').classList.add('hidden');
      openBigPicture.querySelector('.social__comment-shown-count').textContent = commentAmount.textContent;

      renderComments (thisPhotoComments, commentList, commentFragment);
      commentList.replaceChildren(commentFragment);

    } else {
      openBigPicture.querySelector('.comments-loader').classList.remove('hidden');
      let shownCommentsAmount = 5;

      openBigPicture.querySelector('.social__comment-shown-count').textContent = shownCommentsAmount;

      let restComments = thisPhotoComments;
      let showingComments = restComments.splice(0, 5);


      renderComments (showingComments, commentList, commentFragment);

      commentList.replaceChildren(commentFragment);

      showMoreComments.addEventListener('click', function () {
      if (restComments.length >=0) {
          showingComments = restComments.splice(0, 5);
          shownCommentsAmount += showingComments.length;

        renderComments (showingComments, commentList, commentFragment);

          commentList.append(commentFragment);
          openBigPicture.querySelector('.social__comment-shown-count').textContent = shownCommentsAmount;
      }

      if (restComments.length === 0) {
        showMoreComments.disabled = true;
        showMoreComments.textContent = 'Все комментарии загружены';
        showMoreComments.style.color = '#C0C0C0';
      }

    });
    }

    document.addEventListener('keydown', handleEscapeKey);
    closeBigPicture.addEventListener('click', closeModal);
  });
});
