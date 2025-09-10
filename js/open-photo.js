import './photos.js';
import { container, photosTotal } from './photos.js';

const openBigPicture = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const thumbnails = container.querySelectorAll('.picture');

function closeModal() {
  openBigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', handleEscapeKey);
  closeBigPicture.removeEventListener('click', closeModal);
}
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
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
    // openBigPicture.querySelector('.social__comment-count').classList.add('hidden');
    openBigPicture.querySelector('.comments-loader').classList.add('hidden');

    bigPicture.querySelector('img').src = thumbnail.querySelector('img').src;
    bigPicture.querySelector('img').alt = thumbnail.querySelector('img').alt;

    openBigPicture.querySelector('.likes-count').textContent = thumbnail.querySelector('.picture__likes').textContent;
    openBigPicture.querySelector('.social__caption').textContent = thumbnail.querySelector('img').alt;
    commentAmount.textContent = thumbnail.querySelector('.picture__comments').textContent;

    // if (parseInt(commentAmount, 10) <= 5) {
    //   openBigPicture.querySelector('.social__comment-shown-count').textContent = commentAmount;
    // } - это когда будет список, показывающий 5 штук

    openBigPicture.querySelector('.social__comment-shown-count').textContent = commentAmount.textContent;

    const thisPhoto = photosTotal.find(function(photo) {

      const bigPictureImg = bigPicture.querySelector('img');
      const bigPictureSrc = bigPictureImg.src;

      return bigPictureSrc.includes(photo.url);
    });
    const thisPhotoComments = thisPhoto.comment;

    thisPhotoComments.forEach(([comment]) => {
      const template = commentList.querySelector('li').cloneNode(true);

      const image = template.querySelector('.social__picture');
      image.alt = comment.commentName;
      image.src = comment.commentUrl;

    let commentText = template.querySelector('.social__text');
      commentText.textContent = comment.commentMessage;

      commentFragment.appendChild(template);
    });

    commentList.replaceChildren(commentFragment);

    document.addEventListener('keydown', handleEscapeKey);
    closeBigPicture.addEventListener('click', closeModal);
  });
});
