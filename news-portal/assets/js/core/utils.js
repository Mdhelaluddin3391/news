export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const createElement = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstChild;
};