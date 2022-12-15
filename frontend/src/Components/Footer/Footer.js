import html from '../../utils/html';
import Icon from '../Icon/Icon';
import Navigate from '../Router/Navigate';

const Footer = () => {
  renderFooter();
};

function renderFooter() {
  const footerWrapper = document.querySelector('body > footer');

  const homeBtn = html`
    <a
      href="/"
      class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      ${Icon('cat', 48)}
    </a>
  `;
  homeBtn.onclick = (e) => {
    e.preventDefault();
    Navigate('/');
  };

  const footer = html`
    <div class="container">
      <footer
        class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
      >
        <p class="col-md-4 mb-0 text-muted">© 2022 CatByte</p>

        ${homeBtn}

        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">À propos</a></li>
        </ul>
      </footer>
    </div>
  `;

  footerWrapper.replaceChildren(footer);
}

export default Footer;
