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
      <input type="text" id="username" placeholder="Pseudo" required class="form-control mb-3" />
      <input
        type="password"
        id="password"
        required
        placeholder="Mot de passe"
        class="form-control mb-3"
      />
      <div class="d-flex gap-3 justify-content-end">
        <div class="spinner-border d-none" role="status"></div>
        <input value="Se connecter" type="submit" class="btn btn-info" />
      </div>
    </form>
  `;

  form.addEventListener('submit', onLogin);

  main.appendChild(form);
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

    Navigate('/');
  } catch (err) {
    e.target.append(html`<div class="alert alert-danger mt-3 mb-n1">${err.message}</div>`);
  } finally {
    e.target.querySelector('.spinner-border').classList.add('d-none');
  }
}

export default LoginPage;
