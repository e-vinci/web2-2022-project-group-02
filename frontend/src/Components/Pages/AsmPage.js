import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';

const AsmPage = () => {
  clearPage();
  renderPageTitle('ASM');
  renderASM();
};

function renderASM() {
  const main = document.querySelector('main');

  const form = html` <h1>ASM</h1> `;
  main.replaceChildren(form);
}
export default AsmPage;
