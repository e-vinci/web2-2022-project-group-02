import html from './html';

const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');

  const pageTitle = html`<h4 class="text-center vertical-space">${title}</h4>`;
  main.appendChild(pageTitle);
};

export { clearPage, renderPageTitle };
