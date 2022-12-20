import API from '../../utils/api';
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Connexion');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');

  const form = html`
    <form class="p-5 form-box">
      <div class="mb-3">
        <label for="username" class="form-label">Pseudo ou adresse mail</label>
        <input type="text" id="username" placeholder="" required class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" id="password" placeholder="" required class="form-control" />
      </div>
      <div class="d-flex gap-3 justify-content-end">
        <div class="spinner-border d-none" role="status"></div>
        <input value="Se connecter" type="submit" class="btn btn-info" />
      </div>
    </form>
  `;

  const el = html`
    <div class="container">
      ${new URLSearchParams(window.location.search).get('location')
        ? html`
            <div class="alert alert-info">Vous devez être connecté pour accéder à cette page.</div>
          `
        : ''}
      ${form}
    </div>
  `;

  form.addEventListener('submit', onLogin);

  main.appendChild(el);
}

async function onLogin(e) {
  e.preventDefault();

  if (!e.target.querySelector('.spinner-border').classList.contains('d-none')) return;

  e.target.querySelector('.alert')?.remove();
  e.target.querySelector('.spinner-border').classList.remove('d-none');

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const authenticatedUser = await API.POST('/auths/login', {
      username,
      password,
    });

    setAuthenticatedUser(authenticatedUser);

    Navbar();

    const location = new URLSearchParams(window.location.search).get('location');
    Navigate(location || '/');
  } catch (err) {
    e.target.append(html`<div class="alert alert-danger mt-3 mb-n1">${err.message}</div>`);
  } finally {
    e.target.querySelector('.spinner-border').classList.add('d-none');
  }
}

export default LoginPage;
