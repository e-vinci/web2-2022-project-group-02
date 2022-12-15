import { clearPage, renderPageTitle } from '../../../utils/render';
import html from '../../../utils/html';
import Navigate from '../../Router/Navigate';

const ForumPage = () => {
  clearPage();
  renderPageTitle('Forum');
  render();
};

function render() {
  const main = document.querySelector('main');

  const anchorEl = html`
    <a href="#" class="fw-bold stretched-link text-reset text-decoration-none">
      Lorem ipsum dolor sit amet consectetur adipisicing elit
    </a>
  `;
  anchorEl.onclick = (e) => {
    e.preventDefault();
    Navigate('/forum/thread?id=1');
  };

  const form = html`
    <div class="container">
      <div class="d-flex justify-content-end align-items-center">
        <a href="#" class="btn btn-primary">Poser une question</a>
      </div>

      <div class="border rounded p-3 my-3 d-flex gap-3">
        <div class="position-relative flex-shrink-1">
          ${anchorEl}
          <div class="text-muted">
            Fusce euismod eros commodo lectus aliquet ultrices eget sed felis. Nulla placerat
            ultricies orci, eu finibus est mollis eu. Donec ut ligula in tortor scelerisque
            tristique. Aliquam at lectus ante. Vestibulum mollis placerat males...
          </div>
        </div>
        <div class="flex-grow-1 text-nowrap d-flex flex-column justify-content-between text-end">
          <a href="#">Signaler</a>
          <div>Psuedo, le 13/12/2022</div>
        </div>
      </div>
    </div>
  `;
  main.appendChild(form);
}

export default ForumPage;
