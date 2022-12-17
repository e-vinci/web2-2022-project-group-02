import { Modal as BootstrapModal } from 'bootstrap';
import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import { getAuthenticatedUser } from '../../utils/auths';
import API from '../../utils/api';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import Navigate from '../Router/Navigate';
import Logout from '../Logout/Logout';

function UserProfilePage() {
  clearPage();
  renderPageTitle('Profil utilisateur');
  renderPage();
}

async function renderPage() {
  const main = document.querySelector('main');

  const currentUser = getAuthenticatedUser();
  if (!currentUser) return Navigate('/login');

  const userId = new URLSearchParams(window.location.search).get('id') ?? '';

  return main.append(html`${renderUserPage(userId, !userId || Number(userId) === currentUser.id)}`);
}

async function renderUserPage(userId, isCurrentUser = false) {
  let user;

  try {
    user = await API.GET(`/users/${userId}`);
  } catch (e) {
    return html`<div class="alert alert-danger container">
      ${e.message === 'Not Found' ? 'Utilisateur introuvable' : e.message}
    </div>`;
  }

  const editAvatarBtn = html`<button class="btn btn-link">Modifier l'avatar</button>`;
  editAvatarBtn.onclick = editAvatar;

  const deleteAccountBtn = html`<button class="btn btn-link link-danger">Supprimer compte</button>`;
  deleteAccountBtn.onclick = deleteAccount;

  const el = html`
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3 text-center d-flex flex-column align-items-center gap-3">
          <div>${ProfilePicture(user?.id, 150)}</div>
          <div class="fw-bold fs-3">${user.username}</div>
          <div>
            Inscrit depuis le
            <i>
              ${new Date(Math.floor(user.registerTime) * 1000)
                .toLocaleString('fr-BE', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })
                .replaceAll(' ', '&nbsp;')}
            </i>
          </div>
          ${isCurrentUser
            ? html`
                <div class="d-flex flex-row flex-lg-column align-items-center">
                  ${[editAvatarBtn, deleteAccountBtn]}
                </div>
              `
            : ''}
        </div>
        <div class="col-12 col-lg-9">
          <h3>Highscores</h3>
          ${renderHighscores(user)}

          <h3>Questions posées</h3>
          ${renderQuestions(user)}
        </div>
      </div>
    </div>
  `;

  return el;
}

function editAvatar() {
  const modalEl = html`
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier l'avatar</h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body">
            Tu peux modifier ton avatar en te connectant sur
            <a href="https://fr.gravatar.com" target="_blank">gravatar.com</a> et en ajoutant une
            image associée à ton adresse email.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = new BootstrapModal(modalEl);
  modal.show();
}

function deleteAccount() {
  const modalEl = html`
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Supprimer le compte</h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <p>
              Cette action est irréversible. Toutes les données associées à ton compte seront
              supprimées.
            </p>
            <p>Nous sommes désolés de te voir partir. 😿</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = new BootstrapModal(modalEl);
  modal.show();

  const deleteBtn = modalEl.querySelector('button.btn-danger');

  deleteBtn.onclick = async () => {
    try {
      await API.DELETE('/users');
      modal.hide();
      Logout();
    } catch (err) {
      modalEl.querySelector('.modal-body').append(html`
        <div class="alert alert-danger">${err.message}</div>
      `);
    }
  };
}

function renderHighscores(user) {
  const ASMCourse = user.courses?.find((c) => c.title === 'asm');
  const CCourse = user.courses?.find((c) => c.title === 'c');

  return html`
    <ul>
      <li>ASM - ${ASMCourse?.score ?? '0'}</li>
      <li>C - ${CCourse?.score ?? '0'}</li>
    </ul>
  `;
}

async function renderQuestions(user) {
  try {
    const questions = await API.GET(`/forum?author=${user.id}`);

    if (!questions.length) {
      return html`<div class="text-muted">Aucune question posée</div>`;
    }

    return html`
      <ul>
        ${questions.map((question) => {
          const link = html`<a href="#">${question.title}</a>`;
          link.onclick = (e) => {
            e.preventDefault();
            Navigate(`/forum/thread?id=${question.id}`);
          };

          return html`<li>
            ${new Date(Math.floor(question.date) * 1000).toLocaleDateString('fr-BE')}: ${link}
          </li>`;
        })}
      </ul>
    `;
  } catch (e) {
    return html`<div class="alert alert-danger">Erreur lors du chargement des questions</div>`;
  }
}

export default UserProfilePage;
