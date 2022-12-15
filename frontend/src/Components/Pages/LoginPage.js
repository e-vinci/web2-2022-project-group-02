import API from '../../utils/api';
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onLogin);
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const authenticatedUser = await API.POST('/auths/login', {
      username,
      password,
    });

    console.log('Authenticated user : ', authenticatedUser);

    setAuthenticatedUser(authenticatedUser);

    Navbar();

    Navigate('/');
  } catch (err) {
    alert("échec de l'authentification.");
  }
}

export default LoginPage;
