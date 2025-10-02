// import { photoTemplate } from "./templates.js";
// import { loadPhotos } from "./api.js";
//
// export const container = document.querySelector('.pictures');
// export const photosTotal = [];
// let photosData = null;
// console.log('Данные о фотографиях до функции: ' + photosData);
// const loadAndRenderPhotos = async () => {
//   try {
//     photosData = await loadPhotos();
//     console.log('Данные загружены:', photosData);
//
//     const photosListFragment = document.createDocumentFragment();
//
//     photosData.forEach((picture) => {
//       const template = photoTemplate.cloneNode(true);
//
//       const image = template.querySelector('.picture__img');
//       image.alt = picture.description;
//       image.src = picture.url;
//
//       template.querySelector('.picture__likes').textContent = picture.likes;
//       template.querySelector('.picture__comments').textContent = picture.comments.length;
//
//       template.photoData = picture;
//
//       console.log('Лайков: ' + template.photoData.likes);
//       console.log('Комментариев: ' + template.photoData.comments.length);
//       console.log(template.photoData.comments);
//
//       photosListFragment.appendChild(template);
//       photosTotal.push(picture);
//     });
//     console.log('Данные о фотографиях во время функции: ' + photosData);
//
//     container.appendChild(photosListFragment);
//     console.log('Все фото:', photosTotal);
//
//   } catch (error) {
//     console.error('Ошибка загрузки:', error);
//   }
// };
//
// document.addEventListener('DOMContentLoaded', loadAndRenderPhotos);
// console.log('Данные о фотографиях после функции: ' + photosData);
//
//
//
//
