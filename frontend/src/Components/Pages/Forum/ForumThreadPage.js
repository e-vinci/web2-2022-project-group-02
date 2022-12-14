import EasyMDE from 'easymde';
import Modal from '../../Modal/Modal';
import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import { getAuthenticatedUser, isAuthenticated } from '../../../utils/auths';
import API from '../../../utils/api';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import Navigate from '../../Router/Navigate';
import Icon from '../../Icon/Icon';
import FriendlyDate from '../../FriendlyDate/FriendlyDate';
import renderText from './util';

const fetchThread = async () => {
  const id = new URLSearchParams(window.location.search).get('id');

  return API.GET(`/forum/${id}`);
};

const ForumThreadPage = () => {
  clearPage();
  render();
};

const backLink = html` <a href="#" class="btn btn-primary">Retour au forum</a>`;
backLink.onclick = (e) => {
  e.preventDefault();
  Navigate('/forum');
};

function render() {
  const main = document.querySelector('main');

  const fetcher = fetchThread();

  const form = html`
    <div class="container">
      ${fetcher
        .then(
          (thread) => html`
            <h4 class="text-center vertical-space">
              ${thread.locked ? Icon('lock') : ''} ${thread.pinned ? Icon('pin') : ''}
              ${thread.title}
            </h4>

            <div class="text-start">${backLink}</div>

            <div class="my-3" id="thread">${renderThread(thread)}</div>
          `,
        )
        .catch(
          (e) => html`
            <div class="text-start">${backLink}</div>
            <div class="alert alert-danger my-3">
              ${e.message.match(/Not Found/)
                ? "Le fil de discussion n'a pas été trouvé"
                : `Une erreur est survenue: ${e.message}`}
            </div>
          `,
        )}
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
      ${thread.locked
        ? html`<div class="m-3 text-muted">(ce fil de discussion est verrouillé)</div>`
        : renderReplyForm(thread)}
    </div>
  `;
}

function renderPost(post, thread = null) {
  const actions = [];

  const user = getAuthenticatedUser();

  if (user) {
    if (user.id === post.author?.id || user.username === 'admin') {
      const deleteBtn = html`<a href="#" class="link-dark">${Icon('trash')}</a>`;
      actions.push(deleteBtn);

      deleteBtn.onclick = async (ev) => {
        ev.preventDefault();

        const deleteConfirmBtn = html`
          <button type="button" class="btn btn-danger">Supprimer</button>
        `;

        const [modalEl, modal] = Modal({
          title: 'Supprimer le message',
          body: html`<p>Êtes-vous sûr de vouloir supprimer ce message ?</p>`,
          footer: [deleteConfirmBtn],
        });

        deleteConfirmBtn.onclick = async (event) => {
          event.preventDefault();

          try {
            if (thread) {
              await API.DELETE(`/forum/${thread.id}/${post.id}`);
              ForumThreadPage();
            } else {
              await API.DELETE(`/forum/${post.id}`);
              Navigate('/forum');
            }

            modal.hide();
          } catch (err) {
            modalEl.querySelector('.modal-body').replaceChildren(html`
              <div class="alert alert-danger">Une erreur est survenue: ${err.message}</div>
            `);
          }
        };
      };
    } else actions.push(html`<div>&nbsp;</div>`);
    // else actions.push(html`<a href="#" class="link-dark">${Icon('flag')}</a>`);
  } else actions.push(html`<div>&nbsp;</div>`);

  const renderAuthorLink = (child) => {
    const el = html`<a href="#" class="fw-bold link-dark text-decoration-none">${child}</a>`;
    el.onclick = (e) => {
      e.preventDefault();
      Navigate(`/profile?id=${post.author?.id}`);
    };

    return el;
  };

  return html`
    <div class="border rounded p-3 d-flex gap-3 flex-column flex-md-row">
      <div>${renderAuthorLink(ProfilePicture(post.author?.id, 50))}</div>
      <div class="flex-grow-1">
        <div>${renderAuthorLink(post.author?.username)}</div>
        <div>${renderText(post.content)}</div>
      </div>
      <div class="text-nowrap d-flex flex-column justify-content-between text-end align-items-end">
        ${actions}
        <div>${FriendlyDate(post.date * 1000)}</div>
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

      const reply = await API.POST(`/forum/${id}`, { content });

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
