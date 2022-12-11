import html from '../../../utils/html';
import { clearPage } from '../../../utils/render';
import ASMVisualiser from '../../Visualiser/ASMVisualiser';
import exercicesFacile from './ASM/facile';
import exercicesMoyen from './ASM/moyen';
import exercicesDifficile from './ASM/difficile';

const meowrathonASM = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sectionKey = urlParams.get('d');
  let exercices = null;
  if (sectionKey.match('facile')) {
    exercices = exercicesFacile;
  }
  if (sectionKey.match('moyen')) {
    exercices = exercicesMoyen;
  }
  if (sectionKey.match('difficile')) {
    exercices = exercicesDifficile;
  }
  if (exercices === null) {
    const main = document.querySelector('main');
    const erreur = html`
      <div class="notabene centered vertical">
        <h1>Une erreur s'est produite</h1>
        <h5><em>Gabriel is a big dumb-dumb</em></h5>
      </div>
    `;
    main.replaceChildren(erreur);
  } else {
    const ex = exercices[Math.floor(Math.random() * exercices.length)];
    clearPage();
    const main = document.querySelector('main');
    const exercice = html`
      <div class="centered vertical padded">
        <div class="centered notabene">${ex.task}</div>
        ${ASMVisualiser(ex.exampleCode)}
      </div>
    `;

    main.replaceChildren(exercice);
  }
};

export default meowrathonASM;
