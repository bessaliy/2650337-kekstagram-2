import { BASE_URL, Route, Method, ErrorText } from './api.js';
import {sendTemplate, sendErrorTemplate} from './templates.js';

const form = document.querySelector('.img-upload__form');
const formOpener = document.querySelector('.img-upload__start');
const formWindow = document.querySelector('.img-upload__overlay');
const formCloseBtn = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

const hashRegular = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const submitButtonText = submitButton.textContent;

const successModal = sendTemplate.content.cloneNode(true).querySelector('.success');

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText;
}
function closeSuccessModal() {
  // const successModal = sendTemplate.content.cloneNode(true).querySelector('.success');
  successModal.remove();
  changeEventListeners('remove');
}
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const excludedFields = [hashtagField, commentField];
    const activeElement = document.activeElement;

    let shouldClose = true;
    excludedFields.forEach((field) => {
      if (field === activeElement) {
        shouldClose = false;
      }
    });

    if (shouldClose) {
      closeForm();
    }
  }
}
function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeSuccessModal();
  }
}
function onOutsideClick(evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessModal();
  }
}
function switchForm(param1, param2) {
  formWindow.classList[param1]('hidden');
  document.querySelector('body').classList[param2]('modal-open');
}
function changeEventListeners(action) {
  const method = `${action}EventListener`;
  document[method]('keydown', onEscPress);
  document[method]('click', onOutsideClick);
}

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

function resetForm() {
  form.reset();
  pristine.reset();

  const scaleControl = document.querySelector('.scale__control--value');
  scaleControl.value = '100%';

  const originalEffect = document.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }

  const previewImage = document.querySelector('.img-upload__preview img');
  previewImage.src = 'img/upload-default-image.jpg';
  previewImage.style.filter = 'none';

  const effectLevel = document.querySelector('.effect-level');
  if (effectLevel) {
    effectLevel.classList.add('hidden');
  }
}

function closeForm() {
  switchForm('add', 'remove');
  resetForm();
}


formOpener.addEventListener('click', () => {
  switchForm('remove', 'add');
});

function validateHashContent(value) {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = value.split(' ');
  for (const hashtag of hashtags) {
    if (!hashRegular.test(hashtag)) {
      return false;
    }
  }
  return true;
}

function validateHashAmount(value) {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.split(' ');
  return hashtags.length <= 5;
}

function validateHashRepeat(value) {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.split(' ');
  const hashtagsLowerCase = hashtags.map((str) => str.toLowerCase());
  for (let i = 0; i < hashtagsLowerCase.length; i++) {
    for (let j = i + 1; j < hashtagsLowerCase.length; j++) {
      if (hashtagsLowerCase[i] === hashtagsLowerCase[j]) {
        return false;
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

function showSuccessMessage() {
  const successButton = successModal.querySelector('.success__button');

  document.body.appendChild(successModal);

  successButton.addEventListener('click', closeSuccessModal);
  changeEventListeners('add');
}

function showErrorMessage() {
  const errorElement = sendErrorTemplate.content.cloneNode(true);
  const errorModal = errorElement.querySelector('.error');
  const errorButton = errorModal.querySelector('.error__button');

  document.body.appendChild(errorModal);

  function closeErrorModal() {
    errorModal.remove();
    changeEventListeners('remove');
  }

  errorButton.addEventListener('click', closeErrorModal);
  changeEventListeners('add');
}

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  try {
    const formData = new FormData(form);

    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
      method: Method.POST,
      body: formData
    });

    if (!response.ok) {
      throw new Error(ErrorText[Method.POST]);
    }

    closeForm();
    showSuccessMessage();

  } catch (error) {
    showErrorMessage();

  } finally {
    unblockSubmitButton();
  }
});

formCloseBtn.addEventListener('click', closeForm);
document.addEventListener('keydown', handleEscapeKey);

const cancelButton = document.querySelector('.img-upload__cancel');
if (cancelButton) {
  cancelButton.addEventListener('click', closeForm);
}
