import html from '../../../../utils/html';
import ASMVisualiser from '../../../Visualiser/ASMVisualiser';

const pages = [
  () => html`
    <h1 class="centered">0 - Introduction à l'Assembleur</h1>
    <div class="horizontal">
      <div class="vertical">
        <p>
          Les ordinateurs sont un peu bêtes, du coup ils ne comprennent que le binaire, tant pour
          les données qu'ils traitent que pour les programmes qu'ils exécutent.
        </p>
        <p>
          Ces programmes sont composés d'instructions simples, par exemple 0x90, 0xF8, etc. C'est ce
          qu'on appelle du "Language Machine" Le problème, c'est que ces nombres sont stockés sous
          forme binaire ou hexadécimale, ce qui est dur à lire pour un humain.
        </p>
        <p>
          Pour rendre la programmation plus accessible, des noms ont donc été donnés à ces
          instruction, et pour chaque nom d'instruction correspond un "op code". Nos instructions
          deviennent donc NOP, CLC, etc. C'est déja mieux. En plus des noms d'instructions, des
          fonctionnalités permettant de faciliter la programmation ont aussi été ajoutées. Nous
          appelons ce nouveau language L'assembleur.
        </p>
        <div class="notabene centered">
          <p>
            N.B. Il n'éxiste pas qu'un langage assembleur. Les langages assembleurs sont une
            abstraction du fonctionnement électrique du processeur, des processeurs différents ont
            donc des assembleurs différents.
          </p>
        </div>
        <div class="notabene centered">
          <p>
            N.B. 2 une même instruction (par exemple MOV) peut correspondre à plusieurs opcodes. En
            effet, certaines instructions impliquent des informations supplémentaires, comme le mode
            d'adressage, et l'opcode est différent pour chacune des variation de cette instruction.
          </p>
        </div>
      </div>
      <div class="horizontal top" style="padding: 1%; padding-left: 10%;">
        <table>
          <th>LANGUAGE MACHINE</th>
          <tr>
            <td><div class="centered heavy-padded">0x20</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0x0C</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xFD</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0x20</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xED</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xFD</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xC9</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xB1</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xF0</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0xF9</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">0x60</div></td>
          </tr>
        </table>
        <table>
          <tr>
            <th colspan="4"><div class="centered">ASSEMBLEUR</div></th>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">JSR</div></td>
            <td><div class="centered heavy-padded">$FD0C</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">loop:</div></td>
            <td><div class="centered heavy-padded">JSR</div></td>
            <td><div class="centered heavy-padded">$FDED</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">CMP</div></td>
            <td><div class="centered heavy-padded">'1'</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">BEQ</div></td>
            <td><div class="centered heavy-padded">loop</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">RTS</div></td>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
        </table>
      </div>
    </div>
  `,
  () => html`
    <h1 class="centered">0 - Introduction à l'assembleur</h1>
    <div class="horizontal">
      <div class="vertical">
        <p>
          L'assembleur est donc un langage conçu pour être extrêmement simple à convertir en langage
          machine, c'est pourquoi l'assembleur à une structure un peu particulière.
        </p>
        <p>Une ligne d'assembleur se compose en effet de quatre champs:</p>
        <ul>
          <li>Les labels, qui permettent de donner des noms humains à des adresses</li>
          <li>Les Instructions, qui sont, a proprement parler, les commandes du processeur</li>
          <li>Les Operands, qui permettent de spécifier les parametres de l'instruction</li>
          <li>
            Les commentaires, qui permettent de noter des informations utile pour plus facilement
            comprendre le code
          </li>
        </ul>
      </div>
      <div class="centered padded">
        <table>
          <tr>
            <td><div class="centered heavy-padded heavy">label</div></td>
            <td><div class="centered heavy-padded heavy">instruction</div></td>
            <td><div class="centered heavy-padded heavy">operand</div></td>
            <td><div class="centered heavy-padded heavy">commentaire</div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">JSR</div></td>
            <td><div class="centered heavy-padded">$FD0C</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded">loop:</div></td>
            <td><div class="centered heavy-padded">JSR</div></td>
            <td><div class="centered heavy-padded">$FDED</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">CMP</div></td>
            <td><div class="centered heavy-padded">'1'</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">BEQ</div></td>
            <td><div class="centered heavy-padded">loop</div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
          <tr>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded">RTS</div></td>
            <td><div class="centered heavy-padded"></div></td>
            <td><div class="centered heavy-padded"></div></td>
          </tr>
        </table>
      </div>
    </div>
  `,
  () => html`
    <h1>Un exemple rapide d'assembleur</h1>
    <div class="centered notabene">
      <p>
        Voici un rapide exemple d'assembleur, tu peux changer les valeurs et observer le résultat!
      </p>
    </div>
    ${ASMVisualiser(`
section .data
input:				db			0
section .text
				   MOV			al, [input]
boucle:	             	       
				   MOV			bl, [input]
				   CMP			al, 1
				   JE			boucle

	
	`)}
  `,
];

export default pages;
