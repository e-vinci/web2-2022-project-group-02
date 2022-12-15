import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import Navigate from '../../Router/Navigate';

const ForumThreadPage = () => {
  clearPage();
  render();
};

const SVGProfilePicturePlaceholder = () => html`
  <div style="width: 50px; height: 50px; background-color: #ccc; border-radius: 10px"></div>
`;

const backLink = html` <a href="#" class="btn btn-primary"> Retour au forum </a> `;
backLink.onclick = (e) => {
  e.preventDefault();
  Navigate('/forum');
};

function render() {
  const main = document.querySelector('main');

  const form = html`
    <div class="container">
      <div class="text-start">${backLink}</div>

      <div class="border rounded p-3 my-3 d-flex gap-3">
        <div>${SVGProfilePicturePlaceholder()}</div>
        <div class="flex-shrink-1">
          <div class="fw-bold">Le 03/12/22, [Psuedo] :</div>
          <div>
            Fusce euismod eros commodo lectus aliquet ultrices eget sed felis. Nulla placerat
            ultricies orci, eu finibus est mollis eu. Donec ut ligula in tortor scelerisque
            tristique. Aliquam at lectus ante. Vestibulum mollis placerat males...
          </div>
        </div>
        <div class="flex-grow-1 text-nowrap d-flex flex-column justify-content-between text-end">
          <a href="#">Signaler</a>
        </div>
      </div>
      <div class="ms-5 d-flex flex-column gap-3">
        <div class="border rounded p-3 my-3 d-flex gap-3">
          <div>${SVGProfilePicturePlaceholder()}</div>
          <div class="flex-shrink-1">
            <div class="fw-bold">Le 03/12/22, [Psuedo] :</div>
            <div>
              Fusce euismod eros commodo lectus aliquet ultrices eget sed felis. Nulla placerat
              ultricies orci, eu finibus est mollis eu. Donec ut ligula in tortor scelerisque
              tristique. Aliquam at lectus ante. Vestibulum mollis placerat
            </div>
          </div>
          <div class="flex-grow-1 text-nowrap d-flex flex-column justify-content-between text-end">
            <a href="#">Signaler</a>
          </div>
        </div>
      </div>
    </div>
  `;
  main.appendChild(form);
}

export default ForumThreadPage;
