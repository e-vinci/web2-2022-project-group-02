import API from '../../utils/api';
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Inscription');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');

  const termsLink = html`<a href="#">la politique de confidentialité</a>`;
  termsLink.onclick = (e) => {
    e.preventDefault();
    Navigate('/about');
  };

  const form = html`
    <form class="p-5 form-box" id="register-form">
      <div class="mb-3">
        <label for="email" class="form-label">Adresse mail</label>
        <input type="email" id="email" placeholder="" required class="form-control" />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Pseudo</label>
        <input type="text" id="username" placeholder="" required class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" id="password" required placeholder="" class="form-control" />
        <div id="passwordHelpBlock" class="form-text">
          Votre mot de passe doit comporter au minimum huit caractères, au moins une lettre
          majuscule, une lettre minuscule, un chiffre, et un caractère spécial.
        </div>
      </div>
      <div class="mb-3">
        <label for="confirmPswd" class="form-label">Confirmer mot de passe</label>
        <input type="password" id="confirmPswd" required placeholder="" class="form-control" />
      </div>
      <div class="mb-3">
        <input type="checkbox" id="terms" required class="form-check-input " />
        <label for="terms" class="form-check-label">J'accepte ${termsLink}</label>
      </div>
      <div class="d-flex gap-3 justify-content-end">
        <div class="spinner-border d-none" role="status"></div>
        <input value="S'inscrire" type="submit" class="btn btn-info" />
      </div>
    </form>
  `;

  const el = html` <div class="container">${form}</div> `;

  form.addEventListener('submit', onRegister);

  main.appendChild(el);
}

async function onRegister(e) {
  e.preventDefault();

  if (!e.target.querySelector('.spinner-border').classList.contains('d-none')) return;

  e.target.querySelector('.alert')?.remove();
  e.target.querySelector('.spinner-border').classList.remove('d-none');

  const email = document.querySelector('#email').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const confirmPswd = document.querySelector('#confirmPswd').value;
  const terms = document.querySelector('#terms').checked;

  if (!terms) return;

  try {
    if (password === confirmPswd) {
      const authenticatedUser = await API.POST('/auths/register', {
        email,
        username,
        password,
      });

      setAuthenticatedUser(authenticatedUser);

      Navigate('/');
    } else {
      e.target.append(
        html`<div class="alert alert-danger mt-3 mb-n1">
          Veuillez re-entrer votre mot de passe correctement
        </div>`,
      );
    }
  } catch (err) {
    e.target.append(html`<div class="alert alert-danger mt-3 mb-n1">${err.message}</div>`);
  } finally {
    e.target.querySelector('.spinner-border').classList.add('d-none');
  }
}

export default RegisterPage;
