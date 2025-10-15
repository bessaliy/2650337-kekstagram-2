import {container, getPhotosData, onLoadRenderPhotos, renderPhotos} from './picture-from-api.js';
import {getUniqueRandom} from './utils.js';
import {debounce} from './main.js';

const filterContainer = document.querySelector('.img-filters');
filterContainer.classList.remove('img-filters--inactive');


const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const buttons = document.querySelectorAll('.img-filters__button');

buttons.forEach((button) => {
  button.addEventListener('click', function() {
    buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));

    this.classList.add('img-filters__button--active');
  });
});

const clearAll = () => {
  const photoElements = container.querySelectorAll('.picture');
  photoElements.forEach((element) => element.remove());
};

const showDefault = () => {
  clearAll();
  onLoadRenderPhotos().catch((error) => {
    throw new Error(error);
  });
};

const showRandom = () => {
  clearAll();
  const randomSet = new Set();

  for (let i = 0; i < 10; i++) {

    const number = getUniqueRandom(randomSet, 0, 24, 'Не могу придумать новое число');
    const picture = getPhotosData()[number];
    renderPhotos(picture);
    randomSet.add(number);
  }
};

const showDiscussed = () => {
  clearAll();
  const descendingCommentsPhotos = getPhotosData().sort((a, b) =>
    b.comments.length - a.comments.length
  );
  descendingCommentsPhotos.forEach((picture) => {
    renderPhotos(picture);
  });
};


const debouncedShowDefault = debounce(showDefault);
const debouncedShowRandom = debounce(showRandom);
const debouncedShowDiscussed = debounce(showDiscussed);

buttonDefault.addEventListener('click', debouncedShowDefault);
buttonRandom.addEventListener('click', debouncedShowRandom);
buttonDiscussed.addEventListener('click', debouncedShowDiscussed);


