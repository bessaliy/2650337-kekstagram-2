import './form.js';
import './slider.js';
import './api.js';
import './filter.js';
import './picture-from-api.js';
import './photo-preview.js';

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
