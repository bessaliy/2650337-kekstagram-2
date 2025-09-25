// export const elementsLoader = (onSuccess, onError) => () => fetch(
//   'https://31.javascript.htmlacademy.pro/kekstagram/data',
//   {
//     method: 'GET',
//     credentials: 'same-origin',
//   },
// )
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//
//     throw new Error(`${response.status} ${response.statusText}`);
//   })
//   .then((data) => {
//     onSuccess(data);
//   })
//   .catch((err) => {
//     onError(err);
//   });
const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

export const loadPhotos = async () => {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
