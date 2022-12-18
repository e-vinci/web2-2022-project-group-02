import { Tooltip as BootstrapTooltip } from 'bootstrap';
import { clearPage, renderPageTitle } from '../../../utils/render';
import html from '../../../utils/html';
import API from '../../../utils/api';
import { getAuthenticatedUser, isAuthenticated } from '../../../utils/auths';
import Navigate from '../../Router/Navigate';
import Icon from '../../Icon/Icon';
import Modal from '../../Modal/Modal';
import FriendlyDate from '../../FriendlyDate/FriendlyDate';
import renderText from './util';

const fetchPosts = async () => API.GET(`/forum`);

const ForumPage = () => {
  clearPage();
  renderPageTitle('Forum');
  render();
};

function render() {
  const main = document.querySelector('main');

  let askQuestionButton = '';
  if (isAuthenticated()) {
    askQuestionButton = html`<a href="#" class="btn btn-primary">Poser une question</a>`;
    askQuestionButton.onclick = (e) => {
      e.preventDefault();
      Navigate('/forum/new');
    };
  }

  const fetcher = fetchPosts();

  const form = html`
    <div class="container">
      <div class="d-flex justify-content-end align-items-center">${askQuestionButton}</div>

      <div id="posts">
        ${fetcher
          .then(renderPosts)
          .catch(
            (e) => html`
              <div class="alert alert-danger my-3">${`Une erreur est survenue: ${e.message}`}</div>
            `,
          )}
      </div>
    </div>
  `;
  main.appendChild(form);
}

function renderPosts(posts) {
  if (posts.length === 0) return html`<div class="m-3 text-muted">(aucune fil de discussion)</div>`;

  const pinned = posts.filter((post) => post.pinned);
  const unpinned = posts.filter((post) => !post.pinned);

  return html`${[...pinned, ...unpinned].map((reply) => renderPost(reply))}`;
}

function renderPost(post) {
  const actions = [];

  const user = getAuthenticatedUser();

  if (user) {
    if (user.id === post.author.id || user.username === 'admin') {
      const deleteBtn = html`<a href="#" class="link-dark">${Icon('trash')}</a>`;
      actions.push(deleteBtn);

      deleteBtn.onclick = async (ev) => {
        ev.preventDefault();

        const deleteConfirmBtn = html`
          <button type="button" class="btn btn-danger">Supprimer</button>
        `;

        const [modalEl, modal] = Modal({
          title: 'Supprimer le message',
          body: html` <p>Êtes-vous sûr de vouloir supprimer ce message ?</p> `,
          footer: [deleteConfirmBtn],
        });

        deleteConfirmBtn.onclick = async (event) => {
          event.preventDefault();

          try {
            await API.DELETE(`/forum/${post.id}`);
            ForumPage();

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

  const anchorEl = html`
    <a href="#" class="fw-bold stretched-link text-reset text-decoration-none">
      ${post.locked ? Icon('lock') : ''} ${post.pinned ? Icon('pin') : ''} ${post.title}
    </a>
  `;
  anchorEl.onclick = (e) => {
    e.preventDefault();
    Navigate(`/forum/thread?id=${post.id}`);
  };

  const renderAuthorLink = (child) => {
    const el = html`<a href="#" class="fw-bold link-inherit">${child}</a>`;
    el.onclick = (e) => {
      e.preventDefault();
      Navigate(`/profile?id=${post.author?.id}`);
    };

    return el;
  };

  const info = [];

  const repliesNum = post.replies?.length || 0;

  const repliesInfo = html`
    <span title="${repliesNum} réponse${repliesNum !== 1 ? 's' : ''}">
      ${post.replies?.length || 0} ${Icon('chat-dots')}
    </span>
  `;
  // eslint-disable-next-line no-new
  new BootstrapTooltip(repliesInfo);

  info.push(repliesInfo);

  return html`
    <div class="border rounded p-3 my-3 d-flex gap-3">
      <div class="position-relative flex-grow-1">
        ${anchorEl}
        <div
          class="text-muted"
          style="max-height: calc(3em * var(--bs-body-line-height)); overflow: hidden;"
        >
          ${renderText(post.content)}
        </div>
      </div>
      <div class="text-nowrap d-flex flex-column justify-content-between text-end align-items-end">
        ${actions}
        <div class="text-muted">
          <div>${info}</div>
          <div>${renderAuthorLink(post.author.username)}, ${FriendlyDate(post.date * 1000)}</div>
        </div>
      </div>
    </div>
  `;
}

export default ForumPage;
