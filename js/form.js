import { BASE_URL, Route, Method, ErrorText } from './api.js';
import {sendTemplate, sendErrorTemplate} from './templates.js';

const HASH_REGULAR = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');

const form = document.querySelector('.img-upload__form');
const formOpener = document.querySelector('.img-upload__start');
const formWindow = document.querySelector('.img-upload__overlay');
const formCloseBtn = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButtonText = submitButton.textContent;
const successModal = sendTemplate.content.cloneNode(true).querySelector('.success');
const errorElement = sendErrorTemplate.content.cloneNode(true);
const errorModal = errorElement.querySelector('.error');
const errorButton = errorModal.querySelector('.error__button');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText;
};

const onCloseSuccessModal = () => {
  successModal.remove();
  changeEventListeners('remove');
};

const onCloseErrorModal = () => {
  errorModal.remove();
  changeEventListeners('remove');
};

const onHandleEscapeKey = (evt) => {
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
      onCloseForm();
    }
  }
};

const onEscPress = (evt) => {
  if (evt.key === 'Escape') {

    onCloseSuccessModal();
    onCloseErrorModal();
  }
};

const onOutsideClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    onCloseSuccessModal();
  }
};

const switchForm = (param1, param2) => {
  formWindow.classList[param1]('hidden');
  document.querySelector('body').classList[param2]('modal-open');
};

const changeEventListeners = (action) => {
  const method = `${action}EventListener`;
  document[method]('keydown', onEscPress);
  document[method]('click', onOutsideClick);
};

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const resetForm = () => {
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

const onCloseForm = () => {
  switchForm('add', 'remove');
  resetForm();
};


formOpener.addEventListener('click', () => {
  switchForm('remove', 'add');
});

const validateHashContent = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = value.split(' ');
  for (const hashtag of hashtags) {
    if (!HASH_REGULAR.test(hashtag)) {
      return false;
    }
  }
  return true;
};

const validateHashAmount = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.split(' ');
  return hashtags.length <= 5;
};

const validateHashRepeat = (value) => {
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

const showSuccessMessage = () => {
  const successButton = successModal.querySelector('.success__button');

  document.body.appendChild(successModal);

  successButton.addEventListener('click', onCloseSuccessModal);
  changeEventListeners('add');
}

const showErrorMessage = () => {
  document.body.appendChild(errorModal);

  errorButton.addEventListener('click', onCloseErrorModal);
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

    onCloseForm();
    showSuccessMessage();

  } catch (error) {
    showErrorMessage();

  } finally {
    unblockSubmitButton();
  }
});

formCloseBtn.addEventListener('click', onCloseForm);
document.addEventListener('keydown', onHandleEscapeKey);

const cancelButton = document.querySelector('.img-upload__cancel');
if (cancelButton) {
  cancelButton.addEventListener('click', onCloseForm);
}
