import { photoTemplate } from "./templates.js";
import { uploadedPhotos } from "./utils.js";

export const container = document.querySelector('.pictures');
const photosData = uploadedPhotos(25);
const photosListFragment = document.createDocumentFragment();

export const photosTotal = [];

photosData.forEach((picture) => {
  const template = photoTemplate.cloneNode(true);

  const image = template.querySelector('.picture__img');
  image.alt = picture.description;
  image.src = picture.url;

  template.querySelector('.picture__likes').textContent = picture.likes;

  template.querySelector('.picture__comments').textContent = picture.comment.length;

  photosListFragment.appendChild(template);

  photosTotal.push(picture);
});

container.appendChild(photosListFragment);

console.log(photosTotal);






