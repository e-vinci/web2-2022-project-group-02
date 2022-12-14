import html from '../../../../utils/html';
import ASMVisualiser from '../../../Visualiser/ASMVisualiser';

const pages = [
  () => html`
    <h1>04 - Les Flags</h1>
    <div class="vertical">
      <p>
        Il existe de nombreux flags en assembleur, mais seul quelques uns nous intéresseronts. Ce
        qui nous intéresseront sont:
      </p>
      <ul>
        <li>Le zero flag</li>
        <li>Le carry flag</li>
        <li>L'overflow flag</li>
        <li>Le sign flag</li>
      </ul>
    </div>
  `,

  () => html`
    <h1>04 - Les Flags</h1>
    <div class="vertical">
      <h3>Le zero flag</h3>
      <p>
        Le zero flag est activé si le résultat de l'opération précédente est zero et désactivé
        sinon.
      </p>
      <p>
        L'instruction CMP, qui compare les deux operands fournis, utilise ce flag pour donner un
        résultat. En effet, cette instruction soustrait le second operand au premier, mais ne garde
        les deux operands intactes au lieu de remplacer le premier par le résultat de la
        soustraction. Les flags du processeur restent cependant affectés.
      </p>
      <div class="centered vertical padded notabene">
        <p>A toi de jouer !</p>
        <p>teste les opérations qui affectent le zero flag</p>
      </div>
      <div class="centered notabene">
        ${ASMVisualiser(`
section .text
			MOV		eax, 3
			CMP		 eax, 3

			MOV		eax, 4
			CMP		 eax, 3
			`)}
      </div>
    </div>
  `,
  () => html`
    <h1>04 - Les Flags</h1>
    <div class="vertical">
      <h3>Le carry flag</h3>
      <p>
        Si une opération dépasse la valeur maximale d'un registre (8 bits pour al, 16 pour ax,
        etc.), le carry flag est activé pour nous en avertir. On appelle cela un overflow.
      </p>
      <p>
        Si au contraire, l'opération passe en desous de la valeur minimale d'un registre, le carry
        flag est désactivé. On appelle cela un underflow.
      </p>
      <div class="notabene">
        <p>
          Attention, il n'est pas garanti qu'une opération qui ne dépasse pas les limites
          désactivera le carry flag si il était activé. Il est donc important d'utiliser les
          instructions CLC (<b>CL</b>ear <b>C</b>arry) et SEC (<b>SE</b>t <b>C</b>arry) de mannière
          appropriée.
        </p>
      </div>
      <div class="centered vertical padded notabene">
        <p>A toi de jouer !</p>
        <p>teste les opérations qui affectent le carry flag</p>
      </div>
      <div class="centered notabene">
        ${ASMVisualiser(`
section .text
			CLC
			MOV		al, 200
			ADD		 al, 100

			SEC
			MOV		al, 100
			SUB		 al, 200
			`)}
      </div>
    </div>
  `,
  () => html`
    <h1>04 - Les Flags</h1>
    <div class="vertical">
      <h3>L'overflow flag</h3>
      <p>
        Jusqu'à présent, nous sommes partis du principe que les nombres sont des entiers non signés,
        mais il est souvent utile de travailler sur des entiers signés. Pour ce faire, les
        ordinateurs utilisent la notation en complément à 2. Les particularités de cette notation ne
        nous intéressent pas particulièrement ici, en effet leur traitement est pratiquement
        identiques au entiers non signés.
      </p>
      <p>
        Cependant, nous devvons tout de même savoir que le bit de plus grand poids de notre valeur
        est utilisé pour indiquer si notre nombre est positif ou négatif. Les nombres ne sont donc
        plus compris entre <b>0</b> et la <b>valeur maximale</b>, mais entre
        <b>-(valeur maxiale / 2)</b> et <b>+((valeur maximale / 2) - 1)</b>
      </p>
      <p>
        Pour cette raison, les overflow et underflow se produisent sur le bit précédent et le carry
        flag ne fonctionne plus comme prévu. C'est pour cette raison qu'éxiste l'overflow flag, il
        indique les overflow et underflow sur les entiers signés.
      </p>
      <div class="centered vertical padded notabene">
        <p>A toi de jouer !</p>
        <p>teste les opérations qui affectent l'overflow flag</p>
      </div>
      <div class="centered notabene">
        ${ASMVisualiser(`
section .text
			MOV		al, 100
			ADD		 al, 50

			MOV		al, 100
			SUB		 al, 200
			`)}
      </div>
    </div>
  `,
  () => html`
    <h1>04 - Les Flags</h1>
    <div class="vertical">
      <h3>Le sign flag</h3>
      <p>
        Comme vu précédemment, le processeur utilise les mêmes instructions pour traiter les nombres
        signés et non signés. Le sign flag permet de savoir si le résultat d'une opération est un
        nombre positif ou négatif.
      </p>
      <p>
        Tu te demmande peut-être pourquoi ce flag existe, alors que l'on peut déja tester si un
        nombre est positif ou négatif en masquant tout sauf le bit de poids le plus important (avec
        lrinstruction AND nombre, %10000000) ?
      </p>
      <p>
        La réponse est très simple: utiliser le flag est plus éfficace. En effet, mettre à jour le
        flag après une opération ne prend pratiquement pas de temps, il est donc plus rapide
        d'ajouter un flag pour indiquer le signe d'un résultat plutot que de tester le résultat à
        chaque fois qu'on veut en connaitre le signe.
      </p>
      <p>
        De plus, masquer les bits d'un nombre l'écrase du registre, il faudrait donc faire une copie
        du nombre quelque part avant de tester et récupérer le nombre après le test.
      </p>
      <div class="centered vertical padded notabene">
        <p>A toi de jouer !</p>
        <p>teste les opérations qui affectent le sign flag</p>
      </div>
      <div class="centered notabene">
        ${ASMVisualiser(`
section .text
			MOV		al, 100
			ADD		 al, 50

			MOV		al, 100
			SUB		 al, 200
			`)}
      </div>
    </div>
  `,
];

export default pages;
