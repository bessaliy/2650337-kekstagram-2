const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const PERCENT_BASE = 100;

const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imageToScale = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const formOpener = document.querySelector('.img-upload__start');

noUiSlider.create(sliderElement,
  { range: { min: 0, max: 1, }, start: 0, step: 0.1,
    connect: 'lower',}
);

const showSlider = (param) => {
  sliderContainer.classList[param]('hidden');
};

formOpener.addEventListener('click', () => {
  imageToScale.style.filter = '';
  showSlider ('add');
  imageToScale.style.transform = 'scale(1)';
});

effectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('add');
    imageToScale.style.filter = '';
  } else {
    showSlider ('remove');
  }
});

effectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('remove');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 1, } , start: 1, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      imageToScale.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
    });
  }
});

effectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('remove');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 1, } , start: 1, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      imageToScale.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
    });
  }
});

effectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('remove');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 100, } , start: 100, step: 1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      imageToScale.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;
    });
  }
});

effectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('remove');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 3, } , start: 3, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      imageToScale.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;
    });
  }
});

effectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    showSlider ('remove');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 1, max: 3, } , start: 3, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      imageToScale.style.filter = `brightness(${sliderElement.noUiSlider.get()})`;
    });
  }
});

scaleMinus.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10);
  let scalePercent;

  if(scale <= MAX_SCALE && scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    scalePercent = scale / PERCENT_BASE;
    scaleValue.value = `${scale}%`;
    imageToScale.style.transform = `scale(${scalePercent})`;
  }
});
scalePlus.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10);
  let scalePercent;

  if(scale < MAX_SCALE && scale >= MIN_SCALE) {
    scale += SCALE_STEP;
    scalePercent = scale / PERCENT_BASE;
    scaleValue.value = `${scale}%`;
    imageToScale.style.transform = `scale(${scalePercent})`;
  }
});

