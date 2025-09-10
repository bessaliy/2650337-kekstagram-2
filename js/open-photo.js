import './photos.js';
import { container, photosTotal } from './photos.js';
// import {photoTemplate} from "./templates";


const openBigPicture = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const thumbnails = container.querySelectorAll('.picture');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
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

    const thisPhoto = photosTotal.find(photo => photo.url.textContent === bigPicture.querySelector('img').src.textContent);
    console.log(thisPhoto);
    const thisPhotoComments = thisPhoto.comment;
    console.log(thisPhotoComments);

    thisPhotoComments.forEach(([comment]) => {
      const template = commentList.querySelector('li').cloneNode(true);

      console.log(comment);
      console.log(comment.commentName);
      console.log(comment.commentUrl);

      const image = template.querySelector('.social__picture');
      image.alt = comment.commentName;
      image.src = comment.commentUrl;

    let commentText = template.querySelector('.social__text');
      commentText.textContent = comment.commentMessage;

      commentFragment.appendChild(template);

    });

    commentList.replaceChildren(commentFragment);
    commentFragment.replaceChildren();
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        openBigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      }
    });

    closeBigPicture.addEventListener('click', function () {
      openBigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    });

  });
})
//Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого
//        комментария должна выглядеть так:
//
//   <li class="social__comment">
//     <img
//       class="social__picture"
//      +++ src="{{аватар}}"
//       +++ alt="{{имя комментатора}}"
//       width="35" height="35">
//       <p class="social__text">{{текст комментария}}</p>
//   </li>


// <!-- Полноэкранный показ изображения -->
// <section class="big-picture  overlay  hidden"> - openBigPicture
//   <h2 class="big-picture__title  visually-hidden">Просмотр фотографии</h2>
// <div class="big-picture__preview">
//
//   <!-- Просмотр изображения -->
//   <div class="big-picture__img"> - bigPicture
//     <img src="img/logo-background-3.jpg" alt="Девушка в купальнике" width="600" height="600">
//   </div>
//
//   <!-- Информация об изображении. Подпись, комментарии, количество лайков -->
//   <div class="big-picture__social  social">
//     <div class="social__header">
//       <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
//         <p class="social__caption">Тестим новую камеру! =)</p>
//         <p class="social__likes">Нравится <span class="likes-count">356</span></p>
//     </div>
//
//     <!-- Комментарии к изображению -->
//     <div class="social__comment-count"><span class="social__comment-shown-count">5</span> из <span class="social__comment-total-count">125</span> комментариев</div>
//     <ul class="social__comments">
//       <li class="social__comment">
//         <img class="social__picture" src="img/avatar-4.svg" alt="Аватар комментатора фотографии" width="35" height="35">
//           <p class="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
//       </li>
//       <li class="social__comment">
//         <img class="social__picture" src="img/avatar-3.svg" alt="Аватар комментатора фотографии" width="35" height="35">
//           <p class="social__text">Да это фоташоп!!!!!!!!</p>
//       </li>
//     </ul>
//
//     <!-- Кнопка для загрузки новой порции комментариев -->
//     <button type="button" class="social__comments-loader  comments-loader">Загрузить еще</button>
//
//     <!-- Форма для отправки комментария -->
//     <div class="social__footer">
//       <img class="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35">
//         <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
//           <button type="button" class="social__footer-btn" name="button">Отправить</button>
//     </div>
//   </div>
//
//   <!-- Кнопка для выхода из полноэкранного просмотра изображения -->
//   <button type="reset" class="big-picture__cancel  cancel" id="picture-cancel">Закрыть</button> - closeBigPicture
// </div>
// </section>

// ++++ После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев
//    .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

//Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.
//
//+++++ Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее)
//   берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
//
//+++++ Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о
//      конкретной фотографии:
//
//+++++ Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
//
//+++++ Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
//
//+++++ Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
//
//+++++ Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
//

//
//
// ++++ Описание фотографии description вставьте строкой в блок .social__caption.
//

//
// ++++ После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при
//    скролле. При закрытии окна не забудьте удалить этот класс.
//
// +++++ Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
//
// +++++ Подключите модуль в проект.
//
// Как связать модули миниатюр и полноразмерного режима?
// Задача не имеет одного верного решения, поэтому будет правильным как использование третьего модуля для связки двух
//    других, так и импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом этого
//    модуля, addEventListener и замыканиями. Последнее решение похоже на демонстрацию по учебному проекту. А первое — с
//    третьим модулем — более сложное из-за отсутствия примера, но самостоятельное. В качестве третьего модуля можно
//    выбрать точку входа, а можно завести отдельный модуль, например «Галерея». Решение за вами.
