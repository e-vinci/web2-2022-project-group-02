import html from '../../../../utils/html';
import ASMVisualiser from '../../../Visualiser/ASMVisualiser';

const pages = [
  () => html` 
		<h1>3 - Les modes d'adressage</h1>
		<div class="vertical">
			<h3 class="centered">Mais qu'est-ce que c'est que cette chose là ?</h3>
			<p>
				Les modes d'adressages sont les différentes façons d'indiquer des informations nécéssaire à l'exécution d'une instruction.
				Nous allons voire les quelques modes d'adressage principaux, même si tu n'utilisera qu'une partie d'entre-eux et si il éxiste beaucoup 
				d'autres modes d'adressage suplémentaires que nous ne verrons pas.
			</p>

			<ul>
				<li>
					Implicite : L'instruction implique les donées nécéssaires.</br>
					Par exemple : L'instruction "clear carry", CLC, ne prend aucun operand car elle implique que le flag à désactiver est le carry flag.
				</li>

				<li>
					Immédiat : Les données nécéssaires sont fournies juste après l'instruction dans la mémoire.</br>
					Par exemple : L'instruction "MOV   eax, 1" prend 1 comme operand pour fournir la valeur a mettre dans le registre eax. Ce 1 est inscrit directement après l'instruction MOV.
				</li>
			</ul>
		</div>
	`,
  () => html` 
		<h1>3 - Les modes d'adressage</h1>
		<div class="vertical">
			<ul>
				<li>
					Directe : Une adresse est fournie après l'instruction, et les données se trouvent à cette adrese.</br>
					Par exemple : MOV   eax, [label]
				</li>

				<li>
					Indirecte : Une adresse est fournie après l'instruction. A cette adresse se trouve une seconde adresse, et c'est à cette seconde adresse que se trouve les données.
					</br>Par exemple : </br>
					MOV   ebx, [label]</br>
					MOV   eax, [ebx]</br>
					<em>3 paracetamol / 20, would not use again.</em>
				</li>
			</ul>
			<div class="notabene">
				<p>
					N.B. Le mode d'adressage indirecte n'est disponible qu'avec des registres.
					On charge un registre depuis une adresse qui contient l'adresse de la donée,
					puis on utilise un adressage directe pour arriver à la donnée.	
				</p>
			</div>
		</div>
	`,
  () => html` 
		<h1>3 - Les modes d'adressage</h1>
		<div class="vertical">
			<ul>
				<li>
					Directe indexé : Une adresse est fournie après l'instruction, un déplacement est ensuite ajouté à cette adresse pour obtenir l'adresse des données.</br>
					Par exemple : MOV   [eax, label + 2]
				</li>

				<li>
					Indirecte indexé : Une adresse est fournie après l'instruction. A cette adresse nous ajoutons un déplacement pour obtenir une deuxième adresse. 
					A cette deuxième adresse se trouve une troisième adresse.
					Les donnés se trouvent à la troisième adresse.</br>
					</br><em>send halp.</em>
				</li>
			</ul>
		</div>
	`,
  () => html` 
		<h1>3 - Les modes d'adressage</h1>
		<div class="vertical">
			<ul>
				<li>
					Relatif : après l'instruction est fourni un déplacement. Ce déplacement est ajouté à la valeur de l'IP pour obtenir l'adresse des données.</br>
					Ce mode d'adressage est utilisé essentiellement pour les instruction "branch".
				</li>
			</ul>
		</div>
	`,
  () => html`
    <h1>3 - Les modes d'adressage</h1>
    <h3 class="heavy centered">A toi de jouer!</h3>
    <p>charge des valeurs dans les registres suivants avec les mode d'adressage indiqués</p>
    <ul>
      <li>al --> immédiat</li>
      <li>bl --> directe</li>
      <li>cl --> directe indexé</li>
      <li>dl --> indirecte</li>
    </ul>
    ${ASMVisualiser(`
section .data
valeur1:			dd		2, 3, 4, 5, 6, 7, 8, 9, 10
valeur2:                       dd               0
section .text

		`)}
  `,
];

export default pages;
