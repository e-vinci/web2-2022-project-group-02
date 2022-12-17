import { Modal as BootstrapModal } from 'bootstrap';
import { clearPage, renderPageTitle } from '../../../utils/render';
import html from '../../../utils/html';
import API from '../../../utils/api';
import { getAuthenticatedUser, isAuthenticated } from '../../../utils/auths';
import Navigate from '../../Router/Navigate';
import Icon from '../../Icon/Icon';
import renderText from './util';

const fetchPosts = async () => {
  try {
    const posts = await API.GET(`/forum`);

    document
      .querySelector('#posts')
      .replaceChildren(
        posts.length === 0
          ? html`<div class="m-3 text-muted">(aucune fil de discussion)</div>`
          : html` ${posts.map((reply) => renderPost(reply))} `,
      );
  } catch (e) {
    document.querySelector('#posts').replaceChildren(html`
      <div class="alert alert-danger my-3">${`Une erreur est survenue: ${e.message}`}</div>
    `);
  }
};

const ForumPage = () => {
  clearPage();
  renderPageTitle('Forum');
  render();

  fetchPosts();
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

  const form = html`
    <div class="container">
      <div class="d-flex justify-content-end align-items-center">${askQuestionButton}</div>

      <div id="posts">
        <div class="d-flex gap-3 align-items-center justify-content-center m-5">
          <div class="spinner-border" role="status"></div>
        </div>
      </div>
    </div>
  `;
  main.appendChild(form);
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

        const modalEl = html`
          <div class="modal fade" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteModalLabel">Supprimer le message</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <p>Êtes-vous sûr de vouloir supprimer ce message ?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Annuler
                  </button>
                  ${deleteConfirmBtn}
                </div>
              </div>
            </div>
          </div>
        `;

        const modal = new BootstrapModal(modalEl, {});
        modal.show();

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
    <a href="#" class="fw-bold stretched-link text-reset text-decoration-none">${post.title}</a>
  `;
  anchorEl.onclick = (e) => {
    e.preventDefault();
    Navigate(`/forum/thread?id=${post.id}`);
  };

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
      <div class="text-nowrap d-flex flex-column justify-content-between text-end">
        ${actions}
        <div>${post.author.username}, le ${new Date(post.date * 1000).toLocaleString('fr-BE')}</div>
      </div>
    </div>
  `;
}

export default ForumPage;
