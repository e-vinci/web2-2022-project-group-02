import html from '../../../../utils/html';
import warning from '../../../../img/warning.gif';
import CodeDemo from '../CodeDemoElement';

const pages = [
  () => html`
      <h1>1 - Les tableaux en C</h1>
     <br>
   <p> Avant d'entrer dans le vif du sujet, il faut d'abord aborder les constantes. Comment on déclare les constantes en C ?</p>
   
    <p>Simple ! </p>

    <tr>
      <td>
        Il y a 2 manières de déclarer une constante:
        <ul>
          <li>Soit avec un const, exemple: const int TVA = 21; </li>
          <li>Soit via la directive au préprocesseur '#define' (constante symbolique): #define TVA 21</li>
        </ul>
      </td>
    <tr>

    <p class = "heavy"> Attention le define on l'écrit après les includes et avant le main ! Sans le ; en fin de ligne !</p>
    <br>
    <h5 class ="heavy"> Déclaration </h5>
      <p>Pour déclarer un tableau unidimensionnel (avec une seule dimension) rien de bien compliquer, juste faut être très très intentif car le langage ne nous aide pas sur ce coup-là. <br>
      <p>-> Il y a la manière basique de déclarer avec une constante, exemple: 
      int tab [5] = {1, 56, 21, 11, 7} <br>
      Comme tu peux le remarquer, c'est un tableau fixe qui ne sera pas manipulable. 
      </p>  <br>
      
      <p>
      -> L'autre manière est de passer par le 'define'. Exemple: <br>
      <div class="centered">
      ${CodeDemo(
        `#include <stdio.h>

#define TAILLE 100

int main() {

  int tab[TAILLE];
  
  for(int i = 0; i < TAILLE ; i++){
    printf("%d", tab[i]);
  }
    return 0;
}`,
        html` <p>
            <br /><br /><br /><br />
            On a pas encore parler de boucle, ici c'est la boucle for car on sait combien
            d'itération on veut faire. Ensuite on affiche chaque valeur du tableau.
            <br />
          </p>

          <p class="heavy">Par défaut les valeurs des chiffres sont à 0 .</p>
          <p id="test"></p>`,
      )}
</div>
      </p>
      </div>
      <table border="0">
        <tbody>
          <tr>
            <td>
              <img src="${warning}"></td>
            <td>
              <ul>
                <li class ="heavy">Les valeurs entre accolades doivent être des constantes (l'utilisation de variables provoquera une erreur du compilateur)</li>
                <li class ="heavy">Si le nombre de valeurs entre accolades est inférieur au nombre d'éléments du tableau, les derniers éléments sont initialisés à 0</li>
                <li class ="heavy">Il doit y avoir au moins une valeur entre accolades</li>
                <li class ="heavy">Le nombre de valeurs entre accolades ne doit pas être supérieur au nombre d'éléments du tableau</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    `,
];

export default pages;
