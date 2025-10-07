export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
export const Method = {
  GET: 'GET',
  POST: 'POST',
};
export const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

export const getData = async (route, method, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body});
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }
  return response.json();
};

