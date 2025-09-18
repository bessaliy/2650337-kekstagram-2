// 2   С помощью библиотеки noUiSlider (скрипт и стили находятся в директории /vendor/nouislider) реализуйте применение
// эффекта для изображения. Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для
// дальнейшей отправки на сервер.
//
// Наложение эффекта на изображение:
//
//   По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
//   Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для
// реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value в виде числа. При изменении
// уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются
// следующим образом:
//
//   Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
//   При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
//   При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль
// изображения и значение поля должны обновляться.
// //
//   Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния,
//   т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера, но и при
// переключении фильтров.

const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imageToScale = document.querySelector('.img-upload__preview');

let sliderContainer = document.querySelector('.img-upload__effect-level');
let sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value')
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});
// sliderElement.noUiSlider.on('update', () => {
//   sliderValue.value = sliderElement.noUiSlider.get();
// });

function showSlider (param) {
  sliderElement.classList[param]('hidden');
  sliderValue.classList[param]('hidden');
  sliderContainer.classList[param]('hidden');
}
effectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('add');
  } else {
    showSlider ('remove');
  }
});
effectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('remove');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', () => {
      sliderValue.value = sliderElement.noUiSlider.get();
    });
    console.log(sliderValue);
    console.log(sliderValue.value);
    imageToScale.style.filter = 'grayscale(' + sliderValue.value + ')';
  }
})
scaleMinus.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value);
  let scalePercent;

  if (scale <= 100 && scale > 0 ) {
    scale -= 25;
    scalePercent = scale / 100;
    scaleValue.value = scale + '%';
    imageToScale.style.transform = 'scale(' + scalePercent + ')';
  }
});
scalePlus.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value);
  let scalePercent;

  if (scale < 100  && scale >= 0 ) {
    scale += 25;
    scalePercent = scale / 100;
    scaleValue.value = scale + '%';
    imageToScale.style.transform = 'scale(' + scalePercent + ')';
  }
});
