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
      <input
        type="email"
        id="email"
        placeholder="Adresse mail"
        required
        class="form-control mb-3"
      />
      <input type="text" id="username" placeholder="Pseudo" required class="form-control mb-3" />
      <input
        type="password"
        id="password"
        required
        placeholder="Mot de passe"
        class="form-control mb-3"
      />
      <input
        type="password"
        id="confirmPswd"
        required
        placeholder="Confirmer le mot de passe"
        class="form-control mb-3"
      />
      <input type="checkbox" id="terms" required class="form-check-input mb-3" />
      <label class="form-check-label mb-3">J'accepte ${termsLink}</label>
      <div class="d-flex gap-3 justify-content-end">
        <div class="spinner-border d-none" role="status"></div>
        <input value="S'inscrire" type="submit" class="btn btn-info" />
      </div>
    </form>
  `;

  form.addEventListener('submit', onRegister);

  main.appendChild(form);
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
