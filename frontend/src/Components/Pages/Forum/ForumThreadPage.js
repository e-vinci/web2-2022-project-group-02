/* eslint-disable no-alert */
import EasyMDE from 'easymde';
import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import { getAuthenticatedUser, isAuthenticated } from '../../../utils/auths';
import API from '../../../utils/api';
import Navigate from '../../Router/Navigate';
import Icon from '../../Icon/Icon';
import renderText from './util';

const fetchThread = async () => {
  const id = new URLSearchParams(window.location.search).get('id');

  try {
    const thread = await API.GET(`/forum/${id}`);

    document.querySelector('#thread').replaceChildren(renderThread(thread));
    document.querySelector('#thread-title').textContent = thread.title;
  } catch (e) {
    document.querySelector('#thread').replaceChildren(html`
      <div class="alert alert-danger my-3">
        ${e.message.match(/Not Found/)
          ? "Le fil de discussion n'a pas été trouvé"
          : `Une erreur est survenue: ${e.message}`}
      </div>
    `);
  }
};

const ForumThreadPage = () => {
  clearPage();
  render();

  fetchThread();
};

const SVGProfilePicturePlaceholder = () => html`
  <div style="width: 50px; height: 50px; background-color: #ccc; border-radius: 10px"></div>
`;

const backLink = html` <a href="#" class="btn btn-primary">Retour au forum</a>`;
backLink.onclick = (e) => {
  e.preventDefault();
  Navigate('/forum');
};

function render() {
  const main = document.querySelector('main');

  const form = html`
    <div class="container">
      <h4 class="text-center vertical-space" id="thread-title">&nbsp;</h4>

      <div class="text-start">${backLink}</div>

      <div id="thread" class="my-3">
        <div class="d-flex gap-3 align-items-center justify-content-center m-5">
          <div class="spinner-border" role="status"></div>
        </div>
      </div>
    </div>
  `;

  main.appendChild(form);
}

function renderThread(thread) {
  return html`
    ${renderPost(thread)}
    <div class="replies ms-5 d-flex flex-column my-3 gap-3">
      ${thread.replies.length === 0
        ? html`<div class="m-3 text-muted">(aucune réponse)</div>`
        : thread.replies.map((reply) => renderPost(reply, thread))}
      ${renderReplyForm(thread)}
    </div>
  `;
}

function renderPost(post, thread = null) {
  const actions = [];

  const user = getAuthenticatedUser();

  if (user) {
    if (user.id === post.author.id || user.username === 'admin') {
      const deleteBtn = html`<a href="#" class="link-dark">${Icon('trash')}</a>`;
      actions.push(deleteBtn);

      deleteBtn.onclick = async (ev) => {
        ev.preventDefault();

        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

        try {
          if (thread) {
            await API.DELETE(`/forum/${thread.id}/reply/${post.id}`);
            await fetchThread();
          } else {
            await API.DELETE(`/forum/${post.id}`);
            Navigate('/forum');
          }
        } catch (err) {
          alert(`Une erreur est survenue: ${err.message}`);
        }
      };
    } else actions.push(html`<div>&nbsp;</div>`);
    // else actions.push(html`<a href="#" class="link-dark">${Icon('flag')}</a>`);
  } else actions.push(html`<div>&nbsp;</div>`);

  return html`
    <div class="border rounded p-3 d-flex gap-3">
      <div>${SVGProfilePicturePlaceholder()}</div>
      <div class="flex-grow-1">
        <div><span class="fw-bold">${post.author.username}</span></div>
        <div>${renderText(post.content)}</div>
      </div>
      <div class="text-nowrap d-flex flex-column justify-content-between text-end">
        ${actions}
        <div>${new Date(post.date * 1000).toLocaleString('fr-BE')}</div>
      </div>
    </div>
  `;
}

function renderReplyForm(thread = null) {
  if (!isAuthenticated())
    return html`<div class="m-3 text-muted text-end">(connectez-vous pour répondre)</div>`;

  const form = html`
    <form id="reply-form" class="border rounded p-3">
      <div class="fw-bold mb-2">Répondre</div>
      <textarea class="flex-grow-1"></textarea>
      <div class="d-flex justify-content-end align-items-center gap-3">
        <div class="spinner-border d-none" role="status"></div>
        <button type="submit" class="btn btn-primary">Répondre</button>
      </div>
    </form>
  `;

  const easyMDE = new EasyMDE({
    element: form.querySelector('#reply-form textarea'),
    spellChecker: false,
    toolbar: [
      'bold',
      'italic',
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      '|',
      'guide',
    ],
  });

  form.onsubmit = async (ev) => {
    ev.preventDefault();

    if (!document.querySelector('#reply-form .spinner-border').classList.contains('d-none')) return;

    document.querySelector('#reply-form .alert')?.remove();
    document.querySelector('#reply-form .spinner-border').classList.remove('d-none');

    const id = new URLSearchParams(window.location.search).get('id');
    const content = easyMDE.value().trim();

    try {
      if (content.length < 3) {
        form.append(html`<div class="alert alert-danger my-3">Votre message est trop court</div>`);
        return;
      }

      const reply = await API.POST(`/forum/${id}/reply`, { content });

      thread.replies.push(reply);

      document.querySelector('#thread').replaceChildren(renderThread(thread));
      easyMDE.value('');
    } catch (err) {
      form.append(html`<div class="alert alert-danger my-3">
        Une erreur est survenue: ${err.message}
      </div>`);
    } finally {
      document.querySelector('#reply-form .spinner-border').classList.add('d-none');
    }
  };

  return form;
}

export default ForumThreadPage;
