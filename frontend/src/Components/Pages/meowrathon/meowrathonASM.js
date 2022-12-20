import html from '../../../utils/html';
import { clearPage } from '../../../utils/render';
import ASMVisualiser from '../../Visualiser/ASMVisualiser';
import exercicesFacile from './ASM/facile';
import exercicesMoyen from './ASM/moyen';
import exercicesDifficile from './ASM/difficile';
import API from '../../../utils/api';
import { getAuthenticatedUser } from '../../../utils/auths';

let debutTimer;
let finTimer;
let scoreTotal = 0;

function start() {
  debutTimer = new Date();
}

const completeExercice = document.createElement('button');
completeExercice.setAttribute('class', 'btn btn-info');
completeExercice.innerHTML = 'Exercice suivant';
completeExercice.addEventListener('click', () => {
  finTimer = new Date();
  const tempsEcoule = finTimer - debutTimer;
  debutTimer = new Date();
  const score = Math.round((1 / tempsEcoule) * 1000000);
  afficherScore(score);
});

const meowrathonASM = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sectionKey = urlParams.get('d');
  start();
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
        <div class="centered">${ASMVisualiser(ex.exampleCode)}</div>
        <div class="centered notabene affichageScore"><h2 class="scoreAffiche">0 pts</h2></div>
        ${completeExercice}
      </div>
    `;

    main.replaceChildren(exercice);
  }
};

async function afficherScore(score) {
  scoreTotal += score;
  let animationTexte = '+';
  animationTexte += score;
  let scoreAAfficher = scoreTotal;
  scoreAAfficher += 'pts';
  const animation = document.createElement('h2');
  animation.setAttribute('class', 'animationScore');
  animation.innerHTML = animationTexte;
  const scoreAffiche = document.querySelector('.scoreAffiche');
  scoreAffiche.innerHTML = scoreAAfficher;
  const affichageScore = document.querySelector('.affichageScore');
  affichageScore.appendChild(animation);
  const user = getAuthenticatedUser();

  const ancienScore = await API.POST('/leaderboard/getScore', {
    username: user.username,
    cours: 'asm',
  });
  if (ancienScore.score < scoreTotal) {
    API.POST('/leaderboard/setScore', {
      username: user.username,
      cours: 'asm',
      score: scoreTotal,
    });
  }
}

export default meowrathonASM;
