import { photoTemplate } from "./templates.js";
import { loadPhotos } from "./api.js";

export const container = document.querySelector('.pictures');
export const photosTotal = [];

const loadAndRenderPhotos = async () => {
  try {
    const photosData = await loadPhotos();
    console.log('Данные загружены:', photosData);

    const photosListFragment = document.createDocumentFragment();

    photosData.forEach((picture) => {
      const template = photoTemplate.cloneNode(true);

      const image = template.querySelector('.picture__img');
      image.alt = picture.description;
      image.src = picture.url;

      template.querySelector('.picture__likes').textContent = picture.likes;
      template.querySelector('.picture__comments').textContent = picture.comments.length;

      photosListFragment.appendChild(template);
      photosTotal.push(picture);
    });

    container.appendChild(photosListFragment);
    console.log('Все фото:', photosTotal);

  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
};

document.addEventListener('DOMContentLoaded', loadAndRenderPhotos);





