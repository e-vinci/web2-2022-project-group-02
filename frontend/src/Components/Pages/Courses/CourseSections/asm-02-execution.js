import html from '../../../../utils/html';
import ASMVisualiser from '../../../Visualiser/ASMVisualiser';

const pages = [
  () => html`
    <h1 class="centered">2 - L'exécution</h1>
    <div class="centered hoizontal">
      <div class="vertical padded">
        <h3 class="heavy">Et pour exécuter un programme ?</h3>
        <p>
          Comme appercu précédement, un programme en assembleur est composé d'instructions stockées
          en mémoire.
        </p>
        <p>
          Le processeur commence par charger l'instruction indiquée par l'IP, puis incrémente l'IP
          (fetch).
        </p>
        <p>Le processeur peut ensuite exécuter l'instruction qu'il a chargé (execute).</p>
        <p>
          Enfin, le processeur recommance a la première étape. C'est ce qu'on appelle le cycle
          "fetch-execute".
        </p>
      </div>
      <div class="centered vertical padded">animation fetch execute</div>
    </div>
  `,
  () => html`
    <h1 class="centered">2 - L'exécution</h1>
    <div class="centered vertical">
      <h3>A toi de jouer !</h3>
      <div class="centered notabene">
        ${ASMVisualiser(`
section .text
	mov		eax, 1
	mov		ebx, 2
	add		eax, ebx
		`)}
      </div>
    </div>
  `,
];

export default pages;
