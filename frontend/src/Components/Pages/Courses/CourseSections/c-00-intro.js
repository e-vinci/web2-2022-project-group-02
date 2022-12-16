import html from '../../../../utils/html';
import image from '../../../../img/info.png';
import CodeDemo from '../CodeDemoElement';
import CCodeRunner from '../../../CodeRunner/CCodeRunner';

const pages = [
  () => html`
    <h1>0 - Introduction</h1>
   <br>
    <p> Avant de débuter, si tu n’as pas encore des bases en assembleur 
    on te conseille vivement de commencer le cours d’ASM avant de t’attaquer au C ! </p>
    <p> Maintenant que c’est dit, on peut commencer par expliquer c’est quoi le C ? Eh bien, c’est un langage de programmation considéré par la majorité comme bas niveau. 
    <br>
    <div class="notabene centered" id="NB" id="NB" class="horizontal text_box">
      <div class="vertical">
       <img src="${image}" width="15%">
      </div>
      <div class="vertical">
      <p> Un langage est dit de bas niveau lorsque le codage de celui-ci se rapproche du langage maternel de l’ordinateur.</p>
      <p> Contrairement au langage haut niveau qui lui est indépendant du matériel, il permet de créer des programmes portables et non liés à un ordinateur ni à une puce. </p>                 
      </div>
        
    </div>
    <br>
    Ne t’inquiète pas, on ne va pas écrire en binaire c’est incompréhensible par l’être humain. Ça sera le rôle du compilateur de traduire notre code 
    en langage machine c'est-à-dire en binaire pour que le processeur puisse traiter les instructions. Nous, on pourra écrire dans un langage dit intermédiaire qui est compréhensible par l’homme. 
    <br><br>
    Et c’est le but de ce site ! T’expliquer pas à pas, chaque instruction ce qu’elle fait et cerise sur le gâteau, tu auras des animations pour visualiser ce qu’il se passe au cœur de ta machine !
     ça te permettra de mieux assimiler la logique de programmation.
    </p>
    </div>
  `,
  () => {
    const page = html`
      <h1>Hello World !</h1>
      <p>
        <br />
        Voici à quoi ressemble la syntaxe du C, ici on va t'expliquer ligne par ligne, après ça sera
        à toi de pratiquer ! <br />
      </p>
      ${CodeDemo(
        `#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}`,
        html` <p>
            -> Le début du code commence toujours avec les en-têtes (headers), ce sont les 'import'
            de librairies dont on a besoin pour faire fonctionner notre code. <br />
            <br />
            Ici on a fait appel à « stdio.h » , c’est l’une des librairies la plus utilisée en C car
            elle permet principalement la manipulation des flux de caractères, vers un fichiers ou
            la console. Et cette librairie contient beaucoup de fonctions qu’on pourra utiliser pour
            imprimer un message à l’écran par exemple !

            <br />
            <br />
            ->On déclare le main, rien de nouveau, tu remarqueras que le main renvoie un int, on
            t’expliquera ça plus tard !

            <br />
            <br />
            Et voilà notre fonction qui utilise la libraire expliquée plus haut ! C’est le
            System.out.print() en Java.
          </p>
          <p id="test"></p>`,
      )}
    `;

    return [
      page,
      () => {
        // This function is called when the page is loaded
        //   document.getElementById('test').innerText = 'test';
      },
    ];
  },
  () => html`
    <h1>À toi de jouer !</h1>
    <br />
    <div class="horizontal">
      <div class="vertical">
        <p>Ecris un code qui affiche comme message " C facile "</p>
        ${CCodeRunner({
          code: `#include <stdio.h>
   
  int main() {
   
  }`,
          tests: [
            {
              args: [''],
              output: 'C facile',
            },
          ],
        })}
      </div>
    </div>
    <div class="notabene centered" id="NB">
      <p>
        NB: les codesrunners qu'on a implémenté testent uniquement l'output, donc attention c'est
        sensible à la case.
        <br />
        Il se peut que ton code soit fonctionnel, mais juste pour un espace, ton output et celui
        qu'on a intégré dans le code ne soient pas les mêmes et qui fait que ça marque en rouge !
      </p>
    </div>
  `,
  () => {
    const page = html`
      <h1>Les types</h1>
      <br /><br />
      <p>
        Le langage C a un typage statique, c’est-à-dire au moment de déclarer une variable on lui
        donne immédiatement son type (int, char, float, double,…).
        <br />
        La norme du langage, définit pour chaque opérateur quels sont les types admissibles des
        opérandes, et comment déduire le type du résultat. <br /><br />
      </p>
      ${CodeDemo(
        `#include <stdio.h>

int main() {
  int nb = 0;
  printf("%d", nb);
  return 0;
}`,
        html` <p>
            Tu remarques au niveau du printf le "%d". Que signifie-t-il ?
            <br />
            ->En fait, printf c'est une fonction d'impression formatée, c'est-à-dire qu'elle va
            convertir les arguments qu'on lui passe (ici la variable nb) au format qu'on a donné
            après le %. <br /><br />
            Dans notre code, on veut simplement afficher un entier alors on va utilisé alors %d.
          </p>

          <p id="test"></p>`,
      )}
      <br> <br>
      Voilà les plus utilisées, mais sache qu'il y en bien d'autre: 
      <table>
            <tr>
              <td><div class="centered heavy-padded heavy">Format</div></td>
              <td><div class="centered heavy-padded heavy">Type d'objet pointé</div></td>
              <td><div class="centered heavy-padded heavy">Représentation de la donnée saisie</div></td>
            </tr>
            <tr>
              <td><div class="centered heavy-padded">%d</div></td>
              <td><div class="centered heavy-padded">int</div></td>
              <td><div class="centered heavy-padded">décimale signée</div></td>
            </tr>
            <tr>
              <td><div class="centered heavy-padded">%f</div></td>
              <td><div class="centered heavy-padded">float</div></td>
              <td><div class="centered heavy-padded">flottante virgule fixe</div></td>
            </tr>
            <tr>
              <td><div class="centered heavy-padded">%lf</div></td>
              <td><div class="centered heavy-padded">double</div></td>
              <td><div class="centered heavy-padded">flottante virgule fixe</div></td>
            </tr>
            <tr>
              <td><div class="centered heavy-padded">%c</div></td>
              <td><div class="centered heavy-padded">char</div></td>
              <td><div class="centered heavy-padded">caractère</div></td>
            </tr>
            <tr>
              <td><div class="centered heavy-padded">%s</div></td>
              <td><div class="centered heavy-padded">char*</div></td>
              <td><div class="centered heavy-padded">chaîne de caractères</div></td>
            </tr>
          </table>
          </p>
    `;

    return [
      page,
      () => {
        // This function is called when the page is loaded
        //     document.getElementById('test').innerText = 'Code demo page loaded';
      },
    ];
  },
  () => html`
    <h1>À toi de jouer !</h1>
    <br />
    <div class="horizontal">
      <div class="vertical">
        <p>Ecris un code qui swap 2 variables et affiche leurs valeurs avant et après.</p>
        ${CCodeRunner({
          code: `
 
int main() {
 
}`,
          tests: [
            {
              args: [''],
              output: '',
            },
          ],
        })}
      </div>
    </div>
    <br />
    Prends le temps de bien regarder le code, et remarque qu'il manque quelque chose de très
    important dans le code.
  `,
];

export default pages;
