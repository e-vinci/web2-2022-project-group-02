import html from '../../../utils/html';
import { clearPage } from '../../../utils/render';
import Navigate from '../../Router/Navigate';

const ASMFacile = document.createElement('button');
ASMFacile.innerHTML = 'Facile';
ASMFacile.setAttribute('class', 'btn btn-info');
ASMFacile.setAttribute('style', 'margin: 1%');
ASMFacile.addEventListener('click', () => {
  Navigate('/meowrathon/ASM?d=facile');
});

const ASMMoyen = document.createElement('button');
ASMMoyen.innerHTML = 'Moyen';
ASMMoyen.setAttribute('class', 'btn btn-info');
ASMMoyen.setAttribute('style', 'margin: 1%');
ASMMoyen.addEventListener('click', () => {
  Navigate('/meowrathon/ASM?d=moyen');
});

const ASMDifficile = document.createElement('button');
ASMDifficile.innerHTML = 'Difficile';
ASMDifficile.setAttribute('class', 'btn btn-info');
ASMDifficile.setAttribute('style', 'margin: 1%');
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
        <button class="btn btn-info" style="margin: 1%;">Ton Bouton ici!</button>
        <button class="btn btn-info" style="margin: 1%;">A toi de jouer Shera!</button>
      </div>
    </div>
  `;
  main.replaceChildren(page);
};

export default meowrathonHome;
