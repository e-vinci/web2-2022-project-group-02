import html from '../../../utils/html';
import { clearPage } from '../../../utils/render';
import Navigate from '../../Router/Navigate';

const ASMFacile = document.createElement('button');
ASMFacile.innerHTML = 'Facile';
ASMFacile.addEventListener('click', () => {
  Navigate('/meowrathon/ASM?d=facile');
});

const ASMMoyen = document.createElement('button');
ASMMoyen.innerHTML = 'Moyen';
ASMMoyen.addEventListener('click', () => {
  Navigate('/meowrathon/ASM?d=moyen');
});

const ASMDifficile = document.createElement('button');
ASMDifficile.innerHTML = 'Difficile';
ASMDifficile.addEventListener('click', () => {
  Navigate('/meowrathon/ASM?d=difficile');
});

const meowrathonHome = async () => {
  clearPage();
  const main = document.querySelector('main');
  const page = html`
    <div class="horizontal centered">
      <div class="vertical centered notabene">
        <h3>Assembleur</h3>
        ${ASMFacile} ${ASMMoyen} ${ASMDifficile}
      </div>
      <div class="vertical centered notabene">
        <h3>C</h3>
        <button>Ton Bouton ici!</button>
        <button>A toi de jouer Shera!</button>
      </div>
    </div>
  `;
  main.replaceChildren(page);
};

export default meowrathonHome;
