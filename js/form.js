const form = document.querySelector('.img-upload__form');
const formOpener = document.querySelector('.img-upload__start');
const formWindow = document.querySelector('.img-upload__overlay');
const formCloseBtn = document.querySelector('.img-upload__cancel');


const hashRegular = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

import {sendTemplate, errorTemplate} from "./templates.js";
const formSuccessBtn = sendTemplate.querySelector('.success__button');
const formErrorBtn = errorTemplate.querySelector('.error__button');

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const excludedFields = [hashtagField, commentField];
    const activeElement = document.activeElement;

    let shouldClose = true;

    excludedFields.forEach(field => {
      if (field === activeElement) {
        shouldClose = false;
      }
    });
    if (shouldClose) {
      closeForm();
    }
  }
}

//Добавьте обработчик отправки формы, если ещё этого не сделали, который бы отменял действие формы по умолчанию и
// отправлял данные формы посредством fetch на сервер.
//
// Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
//
// Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.
//
// Доработайте обработчик закрытия формы, чтобы кроме закрытия формы он сбрасывал введённые пользователем данные и
// возвращал форму в исходное состояние. Аналогичным образом обработайте нажатие на кнопку сброса.


function switchForm (param1, param2) {
  formWindow.classList[param1]('hidden');
  document.querySelector('body').classList[param2]('modal-open');
}
function closeForm() {
  switchForm ('add', 'remove');

  form.reset();
  pristine.reset();
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);
formOpener.addEventListener('click', () => {
  switchForm ('remove', 'add');
});

function validateHashContent (value) {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(' ');
    for (const hashtag of hashtags) {
      if (!hashRegular.test(hashtag)) {
        return false;
      }
    }
  }
  return true;
}

function validateHashAmount (value) {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(' ');
    if (hashtags.length <= 5) {
      return true
    }
  }
}

function validateHashRepeat (value) {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(' ');
    const hashtagsLowerCase = hashtags.map(str => str.toLowerCase());
    for (let i = 0; i < hashtagsLowerCase.length; i++) {
      let j = i + 1;

      for (j; j < hashtagsLowerCase.length; j++) {
        if (hashtagsLowerCase[i].toString() === hashtagsLowerCase[j].toString()) {
          return false;
        }
      }
    }
  }
  return true;
}

pristine.addValidator(
  commentField,
  (value) => value.length <= 140,
  'Комментарий должен быть короче 140 символов'
);
pristine.addValidator(
  hashtagField,
  validateHashContent,
  'Введен неправильный хештег'
);
pristine.addValidator(
  hashtagField,
  validateHashAmount,
  'Введено слишком много хештегов'
);
pristine.addValidator(
  hashtagField,
  validateHashRepeat,
  'Хештеги не должны повторяться'
);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  if (pristine.validate()) {
    form.submit();
  }
});

formCloseBtn.addEventListener('click', closeForm);
document.addEventListener('keydown', handleEscapeKey);

