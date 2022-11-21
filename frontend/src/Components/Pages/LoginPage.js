import { setAuthenticatedUser, getRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');

  const form = html`
    <form class="p-5">
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        class="form-control mb-3"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        class="form-control mb-3"
      />
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          name="remember"
          name="password"
          class="form-check-input"
          id="remember"
          ${getRememberMe() ? 'checked' : ''}
        />
        <label class="form-check-label" for="remember">Remember me</label>
      </div>
      <input type="submit" value="Login" class="btn btn-info" />
    </form>
  `;

  main.replaceChildren(form);
  form.addEventListener('submit', onLogin);
}

async function onLogin(e) {
  e.preventDefault();

  const { elements } = e.target;

  const username = elements.username.value;
  const password = elements.password.value;
  const remember = elements.remember.checked;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  setAuthenticatedUser(authenticatedUser, remember);

  Navbar();

  Navigate('/');
}

export default LoginPage;
