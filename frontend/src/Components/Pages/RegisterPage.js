import API from '../../utils/api';
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
// import gdpr from '../Pages/GDPR_rules';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
  // gdprRules();
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
  const confirmPswd = document.createElement('input');
  confirmPswd.type = 'password';
  confirmPswd.id = 'confirmPswd';
  confirmPswd.required = true;
  confirmPswd.placeholder = 'confirm password';
  confirmPswd.className = 'form-control mb-3';

  // const condition = document.querySelectorAll('html');
  // condition.length = 'rules';

  const submit = document.createElement('input');
  submit.value = 'Register';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(confirmPswd);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onRegister);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const confirmPswd = document.querySelector('#confirmPswd').value;

  if (password === confirmPswd) {
    try {
      const authenticatedUser = await API.POST('/auths/register', {
        username,
        password,
      });

      console.log('Newly registered & authenticated user : ', authenticatedUser);
      setAuthenticatedUser(authenticatedUser);
      Navigate('/');
      return true;
    } catch (err) {
      alert('pseudo ou mots de passe est invalide');
    }
  } else {
    alert("You didn't enter the same password, dingus");
  }

  Navbar();

  Navigate('/register');

  return false;
}

export default RegisterPage;
