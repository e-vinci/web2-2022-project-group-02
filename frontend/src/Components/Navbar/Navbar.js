// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser } from '../../utils/auths';
import html from '../../utils/html';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const navbarWrapper = document.querySelector('body > header');

  const authenticatedUser = getAuthenticatedUser();

  const navbar = html`
    <nav class="navbar navbar-expand-lg navbar-light bg-info">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">CatByte</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#" data-uri="/">Home</a>
            </li>
            ${authenticatedUser
              ? html`
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/new">Add new movie</a>
                  </li>
                `
              : ``}
          </ul>
          <ul class="navbar-nav navbar-right mb-2 mb-lg-0">
            ${authenticatedUser
              ? html`
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/logout">Logout</a>
                  </li>
                `
              : html`
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/register">Register</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/login">Login</a>
                  </li>
                `}
          </ul>
        </div>
      </div>
    </nav>
  `;

  navbarWrapper.replaceChildren(navbar);
}

export default Navbar;
