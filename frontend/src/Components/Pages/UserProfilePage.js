import Modal from '../Modal/Modal';
import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import { getAuthenticatedUser, setAuthenticatedUser } from '../../utils/auths';
import API from '../../utils/api';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import FriendlyDate from '../FriendlyDate/FriendlyDate';
import Icon from '../Icon/Icon';
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

  const editBtn = html`<button class="btn btn-link">Modifier</button>`;
  editBtn.onclick = () => edit(user);

  const deleteAccountBtn = html`<button class="btn btn-link link-danger">Supprimer compte</button>`;
  deleteAccountBtn.onclick = deleteAccount;

  const el = html`
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3 text-center d-flex flex-column align-items-center gap-3">
          <div>${ProfilePicture(user?.id, 150)}</div>
          <div class="fw-bold fs-3">${user.username}</div>
          <div>
            Inscrit ${FriendlyDate(new Date(Math.floor(user.registerTime) * 1000), 'full', 'short')}
          </div>
          ${isCurrentUser
            ? html`
                <div class="d-flex flex-row flex-lg-column align-items-center">
                  ${[editBtn, deleteAccountBtn]}
                </div>
              `
            : ''}
        </div>
        <div class="col-12 col-lg-9">
          <h3>Highscores</h3>
          ${renderHighscores(user)}

          <h3>Questions pos??es</h3>
          ${renderQuestions(user)}
        </div>
      </div>
    </div>
  `;

  return el;
}

function edit(user) {
  const [modalEl] = Modal({
    title: 'Modifier le profil',
    body: html`
      <p class="text-muted">
        Tu peux modifier ton photo de profil en te connectant sur
        <a href="https://fr.gravatar.com" target="_blank">gravatar.com</a> et en ajoutant une image
        associ??e ?? ton adresse email.
      </p>
      <hr />
      <p class="text-muted">
        Tu peux modifier ton pseudo, ton adresse email et ton mot de passe. Pas besoin de remplir
        les champs que tu ne souhaites pas modifier.
      </p>
      <div class="mb-3">
        <label for="username" class="form-label">Pseudo</label>
        <input type="text" class="form-control" id="username" value="${user.username}" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Adresse mail</label>
        <input type="email" class="form-control" id="email" value="${user.email}" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Nouveau mot de passe</label>
        <input type="password" class="form-control" id="password" />
      </div>
      <hr />
      <div class="mb-3">
        <label for="passwordConfirm" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="passwordConfirm" required />
      </div>
    `,
    footer: html`<button type="submit" class="btn btn-primary">Enregistrer</button>`,
    wrapInForm: true,
  });

  modalEl.querySelector('form').onsubmit = async (e) => {
    e.preventDefault();

    const username = modalEl.querySelector('#username').value;
    const email = modalEl.querySelector('#email').value;
    const password = modalEl.querySelector('#password').value;
    const passwordConfirm = modalEl.querySelector('#passwordConfirm').value;

    try {
      setAuthenticatedUser(
        await API.PUT('/users', {
          username,
          email,
          password,
          passwordConfirm,
        }),
      );

      window.location.reload();
    } catch (err) {
      const alertEl = modalEl.querySelector('.alert');
      if (alertEl) alertEl.innerText = err.message;
      else
        modalEl
          .querySelector('.modal-body')
          .append(html`<div class="alert alert-danger" role="alert">${err.message}</div>`);
    }
  };

  return modalEl;
}

function deleteAccount() {
  const [modalEl, modal] = Modal({
    title: 'Supprimer le compte',
    body: html`
      <p>
        Cette action est irr??versible. Toutes les donn??es associ??es ?? ton compte seront supprim??es.
      </p>
      <p>Nous sommes d??sol??s de te voir partir. ????</p>
    `,
    footer: html` <button type="button" class="btn btn-danger">Supprimer</button> `,
    isStatic: true,
  });

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
      return html`<div class="text-muted">Aucune question pos??e</div>`;
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
            ${question.replies?.length || 0} ${Icon('chat-dots')}
          </li>`;
        })}
      </ul>
    `;
  } catch (e) {
    return html`<div class="alert alert-danger">Erreur lors du chargement des questions</div>`;
  }
}

export default UserProfilePage;
