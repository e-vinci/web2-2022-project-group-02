// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser } from '../../utils/auths';
import html from '../../utils/html';
import logo from '../../img/logo.png';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const navbarWrapper = document.querySelector('body > header');

  const authenticatedUser = getAuthenticatedUser();

  const navbar = html`
    <nav class="navbar navbar-expand-lg navbar-light bg-info">
      <div class="container-fluid">
        <a class="navbar-brand my-n2" href="#">
          <img src="${logo}" style="height: 3em" data-uri="/" />
        </a>
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
              <a class="nav-link" aria-current="page" href="#" data-uri="/courses">Leçons</a>
            </li>
            ${authenticatedUser
              ? html`
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-uri="/">Miaouwrathon</a>
                  </li>
                `
              : html`<li class="nav-item" style="background-color: LightGray">
                  <a class="nav-link" aria-current="page" href="#" data-uri="/">🔒 Miaouwrathon</a>
                </li>`}
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#" data-uri="/">Leaderboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#" data-uri="/forum">Forum</a>
            </li>
          </ul>
          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input
              type="search"
              class="form-control"
              placeholder="Recherche par leçon..."
              aria-label="Search"
            />
          </form>
          <ul class="navbar-nav navbar-right mb-2 mb-lg-0">
            ${authenticatedUser
              ? html`
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/logout">Déconnexion</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/profile">Mon profil</a>
                  </li>
                `
              : html`
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/login">Connexion</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-uri="/register">S'inscrire</a>
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
