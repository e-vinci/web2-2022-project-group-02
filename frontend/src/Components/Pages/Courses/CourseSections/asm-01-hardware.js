import html from '../../../../utils/html';

const referenceObscure = document.createElement('p');
referenceObscure.innerHTML =
  "<em>Tu résistes à la tentation de poser la pile d'assiettes sur ta tête et de danser la macarenna.</em>";
referenceObscure.addEventListener('click', () => {
  window.location.href = 'https://youtu.be/JkKrOpMRr0I';
});

const pages = [
  () => html`
    <h1 class="text-center">1 - Matériel</h1>
    <div class="centered horizontal">
      <div class="centered vertical padded">
        <p>
          Pour fonctionner correctement, un ordinateur doit au minimum avoir un processeur et de la
          mémoire.
        </p>

        <p>La mémoire garde les informations sur lesquelles on travaille.</p>

        <p>
          Le processeur, lui, effectue les opérations requises sur les données stockées en mémoire.
        </p>
      </div>
      <div class="centered vertical padded">
        <p>Illustration ici.</p>
      </div>
    </div>
  `,
  () => html` <h1 class="text-center">1a - La mémoire</h1>
		<div class="centered horizontal">
			<div class="centered vertical padded">
				<p>la mémoire est composée d'octets, chaque octet dans la mémoire porte un numéro qui permet de le retrouver. C'est son adresse.</p>
				<div class="notabene">
					<p>N.B. Certains systèmes divisent aussi la mémoire en "pages" de 2<sup>n</sup> octets. Cela permet plus de flexibilité pour 
					traiter la mémoire et, dans certains cas, du code un peu plus optimisé.</p>
				</div>
			</div>
			<div>
		</div class="centered vertical padded">
			<table>
				<tr>
					<td>0</td>
					<td> - </td>
				</tr>
				<tr>
					<td>1</td>
					<td> - </td>
				</tr>
				<tr>
					<td>2</td>
					<td> - </td>
				</tr>
				<tr>
					<td>3</td>
					<td> - </td>
				</tr>
				<tr>
					<td>4</td>
					<td> - </td>
				</tr>
			</table>
		</div>
	`,
  () => html`
    <h1 class="text-center">1a - La mémoire</h1>
    <div class="centered horizontal">
      <div class="vertical padded">
        <p>La mémoire peut stocker tout types de données.</p>
        <p>
          A vrai dire, la mémoire ne sintéresse pas vraiment à ce qu'elle stocke. Tout ce qui lui
          importe, c'est que une certaine valeur est stockée à une certaine adresse.
        </p>
        <p>
          C'est le programmeur qui est chargé d'interpreter les valeurs stockées en mémoire
          correctement.
        </p>
        <div class="notabene">
          <p>
            Toutes les adresses représentées ci-contre contiennent la même valeur. Cette valeur est
            juste interprétée de manière différente.
          </p>
        </div>
      </div>

      <div class="centered vertical padded" style="min-width: 40%;">
        <table>
          <tr>
            <td>0</td>
            <td>'A'</td>
          </tr>
          <tr>
            <td>1</td>
            <td>65</td>
          </tr>
          <tr>
            <td>2</td>
            <td>INC EBX</td>
          </tr>
          <tr>
            <td>3</td>
            <td style="min-width: 60%;">
              <table>
                <tr>
                  <td class="heavy false">F</td>
                  <td class="heavy true">T</td>
                  <td class="heavy false">F</td>
                  <td class="heavy false">F</td>
                  <td class="heavy false">F</td>
                  <td class="heavy false">F</td>
                  <td class="heavy false">F</td>
                  <td class="heavy true">T</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
  () => html`
    <h1 class="text-center">1a - La mémoire</h1>
    <div class="centered horizontal">
      <div class="vertical padded">
        <h3 class="heavy">Quid des valeurs plus grandes qu'un octet?</h3>
        <p>
          Le cas le plus simple est celui des collections d'octets, par exemple les chaines de
          caractères.
        </p>
        <p>
          Dans ce cas, les octets sont simplement stockés les uns à la suite des autres. Un "null
          byte" peut aussi être ajouté pour indiquer la fin de la chaine d'octets.
        </p>
        <p>
          Les nombres sur 32 bits sont un peu plus complexe, il éxiste deux approches le "big
          endian" et le "little endian" (à ne pas confondre avec "little indian").
        </p>
        <p>
          Dans les deux cas, le nombre 32-bit est divisé en 4 octets, mais le big endian stocke les
          octets dans l'ordre alors que le little endian les stocke dans l'ordre inverse
        </p>
        <div class="notabene">
          <p>Little endian est parfois appelé "Least Significant Bit first" ou "LSB first".</p>
          <p>Big endian est parfois appelé "Most Significant Bit first" ou "MSB first".</p>
        </div>
      </div>

      <div class="centered vertical padded" style="min-width: 40%;">
        <table>
          <tr>
            <td>0</td>
            <td>'C'</td>
          </tr>
          <tr>
            <td>1</td>
            <td>'H'</td>
          </tr>
          <tr>
            <td>2</td>
            <td>'A'</td>
          </tr>
          <tr>
            <td>3</td>
            <td>'T'</td>
          </tr>
          <tr>
            <td>4</td>
            <td>'\\0'</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  () => html`
    <h1 class="text-center">1a - La mémoire</h1>
    <div class="centered horizontal">
      <div class="vertical padded"></div>
      <table>
        <tr>
          <th colspan="2">BIG ENDIAN</th>
        </tr>
        <tr>
          <td>0</td>
          <td>0x12</td>
        </tr>
        <tr>
          <td>1</td>
          <td>0x34</td>
        </tr>
        <tr>
          <td>2</td>
          <td>0x56</td>
        </tr>
        <tr>
          <td>3</td>
          <td>0x78</td>
        </tr>
      </table>

      <div class="centered vertical padded">
        <table>
          <tr>
            <th colspan="2">LITTLE ENDIAN</th>
          </tr>
          <tr>
            <td>0</td>
            <td>0x78</td>
          </tr>
          <tr>
            <td>1</td>
            <td>0x56</td>
          </tr>
          <tr>
            <td>2</td>
            <td>0x34</td>
          </tr>
          <tr>
            <td>3</td>
            <td>0x12</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  () => html`
    <h1 class="text-center">1a - La mémoire</h1>
    <div class="centered horizontal">
      <div class="vertical padded">
        <p>
          Enfin, il éxiste une zone particulière de la mémoire, nomée la pile. Cette zone de mémoire
          est essentiellement utilisée pour les appels de sous-routines, mais elle reste accessible
          à l'utilisateur pour stocker n'importe quelle valeur.
        </p>
        <p>
          Il n'est, en théorie, possible d'y accéder que via les instructions push et pop. Quand on
          push une valeur sur la pile, celle-ci est posée par dessus les autres valeurs. C'est donc
          la seule valeur disponible. Quand on pop une valeur de la pile, seule la valeur tout en
          haut de la pile est disponible, c'est donc celle-ci qui est récupérée. Mais, ayant
          récupéré la valeur tout en haut de la pile, la valeur directement en dessous est à nouveau
          disponible, et nous pouvons à nouveau y accéder.
        </p>
        <p>
          La valeur en haut de la pile est indiquée par le "Stack Pointer", <b>SP</b> Celui-ci est
          incrémenté avant un push et décrémenté après un pop.
        </p>
      </div>
    </div>
  `,
  () => html`
	<h1 class="text-center">1a - La mémoire</h1>
	<div class="centered horizontal">
		<div class="vertical padded">
			<p>Immagines que tu as une pile d'assiettes :-p</p>
			<p>Quand on te donne une valeur, tu l'écris sur une assiette et tu pose l'assiette en haut de la pile.</p>
			<p>Je te donne un '1', que tu poses sur ta pile. ${referenceObscure}
			Puis je te donne un '2', que tu poses aussi sur ta pile. </p>
			<p>Enfin, je te demmande une valeur de la pile, tu prends la première assiette de la pile et tu me rends mon '2'.</p>
			<p>L'assiette en haut de la pile contient maintenant un '1', et c'est ce que tu me rendrais si je te demmandais une autre valeur.</p>

			<p>La dernière valeur ajoutée est la première récupérée.</br>
			<b>L</b>ast <b>I</b>n, <b>F</b>irst <b>O</b>ut</br>
			<b>LIFO</b></p>
		</div>
	</div>
  `,
  () => html`
		<h1 class="text-center">1b - Le processeur</h1>
		<div class="centered horizontal">
			<div class="vertical padded">
				<p>
					Le processeur est le cerveau de l'ordinateur. C'est un composant très complexe, et pour
					cette raison, nous ne rentrerons pas dans les détails. Nous nous contenterons de souligner
					quelques parties importantes.
				</p>
				<p>
					D'abord, Il y a les registres. Le processeur comprend de nombreux registres, 
					mais nous ne concentrerons que sur 6 d'entre eux:
				</p>
				<ul>
					<li>
						EAX, EBX, ECX et EDX : Ce sont des registres polyvalents. C'est dans ces registres que sont traités les information
						de l'utilisateur.
					</li>
					<li>
						ESP : Nous en avons déja parlé précédement; le stack pointer permet de retrouver la valeur en haut de la pile.
					</li>
					<li>
						EIP : L'instruction pointer, comme son nom l'indique, est un pointeur vers une adresse mémoire.
						Cette adresse contient l'instruction que doit éxecuter le processeur. L'EIP est donc incrémenté après le cycle "fetch".
					</li>
				</ul>
			</div>
			<div class="centered vertical padded"></div>
				<p>schéma CPU ici, registres mis en évidence</p>
			</div>
		</div>

	`,
  () => html`
		<h1 class="text-center">1b - Le processeur</h1>
		<div class="centered horizontal">
			<div class="padded vertical" style="max-width: 65%;">
				<p>
					Ensuite, il y a l'ALU, "<b>A</b>rithmetic and <b>L</b>ogic <b>U</b>nit".
				</p>
				<p>
					Cette partie du processeur est celle qui effectue les opérations mathématiques à proprement parler.
				</p>
				<div class="notabene">
					<p>
						N.B. D'autres types d'opérations, par exemple les opération sur la mémoire ou 
						sur le flux d'exécution sont gérés par d'autres parties du processeur.
						De plus les opérations mathématiques plus complexes comme les racines carrées, les exposants ou
						les opérations sur des nombres flotants sont traités par un "coprocesseur mathématiques".
						Ce coprocesseur mathématique était, il y a longtemps, une puce séparée du processeur (c.f. intel 8087).
						Il est maintenant intégré au processeur mais la notation est restée, ce qui donne une syntaxe improbable
						pour ce genre d'opérations. Pour cette raison, ce cours ne requiert pas l'utilisation de ces instructions.
					</p>
				</div>
			</div>
			<div class="padded centered vertical"></div>
				<p>schéma CPU ici, ALU mis en évidence</p>
			</div>
		</div>
	`,
  () => html`
		<h1 class="text-center">1b - Le processeur</h1>
		<div class="centered horizontal">
			<div class="padded vertical" style="max-width: 65%;">
				<p>
					Enfin, il existe un dernier registre un peu particulier. Le Processor Status Word (PSW).
				</p>
				<p>
					Ce registre donne des informations sur l'opération que le processeur vient d'effectuer, chaque bit, surnomé flag, du registre représente une information sur l'opération.
					Les flags les plus importants sont le "carry" qui indique si l'opération a causé un overflow ou un underflow et le "zero" qui indique si le résultat de l'opération est nul.
				</p>
			</div>
			<div class="padded centered vertical"></div>
				<p>schéma CPU ici, PSW mis en évidence</p>
			</div>
		</div>
	`,
  () => html`
	<h1 class="text-center">1c - Les bus</h1>
	<div class="centered horizontal">
		<div class="padded vertical" style="max-width: 65%;">
			<p>
				Nous avons maintentant un CPU et de la mémoire!</br>
				Nous avons donc un ordinateur ?
			</p>
			<p>
				Pas tout à fait, il manque encore une chose.</br>
				Le processeur et la mémoire ne communiquent pas encore. Pour communiquer avec des périphériques, le processeur utilise des bus, 
				des groupes de lignes électriques qui servent à transmettre des données.
				Un processeur a en général deux bus principaux, le bus d'adresse qui lui permet de choisir une donnée et un bus de donnée qui lui permet de lire et d'écrire des données sur un périphérique.
				En plus de ces deux bus, le processeur possède une ligne supplémentaire qui lui permet d'indiquer à un périphérique si il veut lire ou écrire des données.
			</p>
			<div class="notabene">
				<p>
					Tout types de périphériques peuvent communiquer sur le bus de données, non seulement de la mémoire, 
					mais aussi des interfaces homme-machine comme des claviers ou des terminaux,
					des périphériques de stockage, etc.
				</p>
				<p>
					De plus, il est parfois possible qu'un périphérique prenne le controle des bus de données et d'adresse pour lire des données en mémoire sans passser
					par le CPU.
				</p>
				<p>
					Enfin, les périphériques possèdent encore une entrée supplémentaire, le "chip select".
					Lorsque cette entrée est désactivée, la puce électronique passe dans un mode particulier (le mode "high impedance")
					dans lequel elle est électriquement invisible au reste des composants. Une puce peut se bloquer elle même dans ce mode si elle tombe en panne
					pour éviter de causer des problèmes. Il suffit alors de poser une puce neuve par dessus l'ancienne et seul la puce neuve sera visible pour les autres composants.
				</p>
			</div>
		</div>
		<div class="padded centered vertical"></div>
			<p>schéma CPU/mémoire reliés par des bus</p>
		</div>
	</div>
`,
];

export default pages;
