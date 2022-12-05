import html from '../../../../utils/html';

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
            juste intérprètée de manière différente
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
			<p>Je te donne un '1', que tu poses sur ta pile. <em>Tu résistes à la tentation de poser la pile d'assiettes sur ta tête et de danser la macarenna.</em>
			Puis je te donne un '2', que tu poses aussi sur ta pile. 
			Enfin, je te demmande une valeur de la pile, tu prends la première assiette de la pile et tu me rends mon '2'.
			L'assiette en haut de la pile contient maintenant un '1', et c'est ce que tu me rendrais si je te demmandais une autre valeur.</p>

			<p>La dernière valeur ajoutée est la première récupérée.</br>
			<b>L</b>ast <b>I</b>n, <b>F</b>irst <b>O</b>ut</br>
			<b>LIFO</b></p>
		</div>
	</div>
  `,
  () => html` <h1 class="text-center">1b - Le processeur</h1> `,
];

export default pages;
