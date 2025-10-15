const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    effectPreviews.forEach((picture) => {
      picture.style.backgroundImage = `url(${url})`;
    });
  }
});
