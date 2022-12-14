import html from '../../../../utils/html';
import ASMVisualiser from '../../../Visualiser/ASMVisualiser';

const pages = [
  () => html`
		<h1 class="centered">5 - Contrôle du flux d'exécution</h5>
		<div class="vertical">
			<p>
				Jusqu'à présent, le flux d'exécution de notre programme était linéaire, c'est à dire que le programme passait simplement d'une instruction à la suivante.
			</p>
			<p>
				Il peut, cependant, être intéressant, voire indispensable, de modifier le flux d'exécution du programme. Pour cela, il existe trois instructions:
			</p>
			<ul>
				<li>Les jumps</li>
				<li>Les branchs</li>
				<li>Les sous-routines</li>
			</ul>
		</div>
	`,
  () => html`
    <h1 class="centered">5a - Les jumps</h1>
    <div class="vertical">
      <p>
        Les jumps fonctionne d'une manière assez simple: On leur fournis une adresse en operand, et
        le jumps remplace l'<b>IP</b> par cette adresse.
      </p>
      <div class="notabene">
        <p>
          N.B. Les jumps sont absoluts et inconditionnels, c'est à dire qu'ils remplacent l'IP par
          une adresse fournie immédiatement après l'instruction (absoluts) et qu'ils remplacent
          toujours l'IP (inconditionnels).
        </p>
      </div>
    </div>
  `,
  () => html`
		<h3 class="heavy centered>A toi de jouer !</h3>
		<div class="centered notabene">
			<p>
				complète l'instruction jump pour exécuter le second morceau de code avant le premier.
			</p>
		</div>
		${ASMVisualiser(`
section .text
				JMP
				MOV			eax, 1
				MOV			ebx, 2

jump:
				MOV			eax, 2
				MOV			ebx, 1
		`)}
	`,
  () => html`
		<h1 class="centered">5b - Les branch</h1>
		<div class="vertical">
			<p>
				Les branch affectent eux aussi l'<b>IP</b>, mais seulement si une condition est remplie, ces conditions sont vérifiées sur le registre d'état du processeur.
				Par exemple, <b>BNE</b> n'affecte l'<b>IP</b> que si le zero flag est désactivé.
			</p>
			<div class="notabene">
				<p>
					N.B. Contrairement aux jumps, les branchs sont relatifs et conditionnels, c'est à dire qu'ils n'affectent l'<b>IP</b> que si une condition est remplie (conditionnels)
					et qu'au lieu de fournir une adresse en operand, on fournis une déplacement qui est ajouté à l'<b>IP</p> courrant.

					Pour cette raison, les branchs ont une portée plus limitée que les jumps. En effet, certains systèmes limitent ce déplacement à 8 ou 16 bits, ce qui permet d'avancer 
					d'au maximum 127 (8-bit) ou 32767(16-bit) octets.
				</p>
			</div>
			<div class="notabene">
				<p>
					N.B.2 La distinction entre un jump et un branch est en réalité plus floue. Il éxiste en effet des branch inconditionnels, et certains systèmes
					utilisent parfois le terme jump dans les deux cas.
				</p>
			</div>
		</div>
	`,
  () => html`
		<h3 class="heavy centered>A toi de jouer !</h3>
		<div class="centered notabene">
			<p>
				utilisez le bon branch pour n'exécuter aucun move
			</p>
		</div>
		${ASMVisualiser(`
section .text
				JMP
				MOV			eax, 1
				MOV			ebx, 2

jump:
				MOV			eax, 2
				MOV			ebx, 1
		`)}
	`,
];

export default pages;
