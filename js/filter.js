import {container, photosData, loadAndRenderPhotos, renderPhotos} from './picture-from-api.js';
import {getUniqueRandom} from './utils.js';
import {debounce} from "./main.js";

let filterContainer = document.querySelector('.img-filters');
filterContainer.classList.remove('img-filters--inactive');


const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const buttons = document.querySelectorAll('.img-filters__button');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('img-filters__button--active'));

    this.classList.add('img-filters__button--active');
  });
});

function clearAll() {
  const photoElements = container.querySelectorAll('.picture');
  photoElements.forEach(element => element.remove());
}

function showDefault() {
  clearAll();
  loadAndRenderPhotos().catch((error) => {
    console.error('Ошибка при загрузке фото:', error)
  });
}

function showRandom() {
  clearAll();
  let randomSet = new Set();

  for (let i = 0; i <10; i++) {

    let number = getUniqueRandom(randomSet, 0, 24, 'Не могу придумать новое число');
    const picture = photosData[number];
    renderPhotos(picture);
    }
  }

function showDiscussed() {
  clearAll();
  const descendingCommentsPhotos = photosData.sort((a, b) =>
    b.comments.length - a.comments.length);

  descendingCommentsPhotos.forEach((picture) => {
    renderPhotos(picture);
  });
}
const debouncedShowDefault = debounce(showDefault);
const debouncedShowRandom = debounce(showRandom);
const debouncedShowDiscussed = debounce(showDiscussed);

buttonDefault.addEventListener('click', debouncedShowDefault);
buttonRandom.addEventListener('click', debouncedShowRandom);
buttonDiscussed.addEventListener('click', debouncedShowDiscussed);


