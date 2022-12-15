import html from '../../../../utils/html';
import warning from '../../../../img/warning.gif';
import CodeDemo from '../CodeDemoElement';

const pages = [
  () => html`
    <h1>1 - Les tableaux en C</h1>
    <br />
    <p>
      Avant d'entrer dans le vif du sujet, il faut d'abord aborder les constantes. Comment on
      déclare les constantes en C ?
    </p>

    <p>Simple !</p>

    <tr>
      <td>
        Il y a 2 manières de déclarer une constante:
        <ul>
          <li>Soit avec un const, exemple: const int TVA = 21;</li>
          <li>
            Soit via la directive au préprocesseur '#define' (constante symbolique): #define TVA 21
          </li>
        </ul>
      </td>
    </tr>

    <p class="heavy">
      Remarque: le define s'écrit après les includes et avant le main ! Sans le ; en fin de ligne !
    </p>
    <br />
    <h5 class="heavy">Déclaration</h5>
    <p>
      Pour déclarer un tableau unidimensionnel (avec une seule dimension) rien de bien compliquer,
      juste faut être très très intentif car le langage ne nous aide pas sur ce coup-là. <br />
    </p>

    <div>
      <tr>
        <td>
          <p>
            -> Il y a la manière basique de déclarer avec une constante. <br />
            Exemple:
          </p>

          <div class="centered">
            ${CodeDemo(
              `#include <stdio.h>
int main() {
  int tab[5] = {12,5,6,-7,2};
  
  for(int i = 0; i <= 5 ; i++){
    printf("%d", tab[i]);
  }
    return 0;
}`,
              html` <p>
            <br />
           Attention il y a une faute très grave ici, cherche avant de continuer de lire !<br>
           ... <br>
           Alors ?<br>
           <-- regarde ici... oui i commence de 0 jusque 5 donc il va arriver à tab[5] alors qu'il n'y a que 5 valeurs dans le tableau. Jusque là tu vas me dire qu'il n'y a pas le feu, le compilateur va génèrer une erreur, comme en Java.<br>
            <strong>Eh bien NON !! Oublie Java, le langage C n'impose pas à une implémentation de vérifier les accès, en écriture comme en lecture, hors des limites d'un tableau.</strong>
            <br />
            <p>Donc il faut être très très attentif au code, c'est la faiblesse du C. Il va simplement afficher une valeur random à la position tab[5] (ce qui se trouve dans la mémoire). </p>
          </p>

          <p id="test"></p>`,
            )}
          </div>
          <br />
          <div id="NB">
            <p class="heavy">
              Attention ! Quand tu déclares un tableau statique, comme l'exemple plus haut, tu ne
              peux plus modifier ses valeurs, cela va générer une segmentation fault !
            </p>
            <p>
              En fait c'est parce que les valeurs statiques sont stockés dans la partie Read-Only de
              la mémoire, et donc c'est uniquement accessible à la lecture. On utilise rarement les
              variables statiques mais c'est une information tout de même utile.
            </p>
          </div>
          <br />
          <p>-> L'autre manière est de passer par le 'define'.</p>

          <p>Exemple:</p>
          <div class="centered">
            ${CodeDemo(
              `#include <stdio.h>

#define TAILLE 100

int main() {
  int tab[TAILLE];
  
  for(int i = 0; i < TAILLE ; i++){
    tab[i] = i * (i+1);
    printf("%d", tab[i]);
  }
    return 0;
}`,
              html` <p>
                  <br /><br /><br /><br /><br /><br /><br />
                  On a pas encore parler de boucle, ici c'est la boucle for car on sait combien
                  d'itération on veut faire. Ensuite on affiche chaque valeur du tableau.
                  <br />
                </p>

                <p id="test"></p>`,
            )}
          </div>
          <table border="0">
            <tbody>
              <tr>
                <td>
                  <img src="${warning}" />
                </td>
                <td>
                  <ul>
                    <li class="heavy">
                      Les valeurs entre accolades doivent être des constantes (l'utilisation de
                      variables provoquera une erreur du compilateur),
                    </li>
                    <li class="heavy">
                      Si le nombre de valeurs entre accolades est inférieur au nombre d'éléments du
                      tableau, les derniers éléments sont initialisés à 0,
                    </li>
                    <li class="heavy">Il doit y avoir au moins une valeur entre accolades,</li>
                    <li class="heavy">
                      Le nombre de valeurs entre accolades ne doit pas être supérieur au nombre
                      d'éléments du tableau.
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </div>
  `,
  () => html`
      <div>
        <p>2 choses à savoir, la première concerne les valeurs non initialisés auront comme valeur dépendant de leur type:</p>
                <ul>
                  <li>Pour les chiffres (int, double, float,...) c'est 0, </li>
                  <li>Pour le bool c'est false,</li>
                  <li>Pour le char c'est '\\0' (qui veut dire null),</li>
                </ul>
              </td>
              <p> Donc ça veut dire, si on déclare : <br>
              <p>Exemple 1:</p>
                  <p>bool tabBool[5] = {true}; <strong> <-- uniquement l'indice 0 qui est initialisé à true !</strong>
                  <br>-> Il faudra alors initialisé soit à la manière barbare,c'est-à-dire, un par un : bool tabBool[5] = {true,true,true,true,true}; <br>
                  ->Ou bien plus efficace, passer par une boucle for.</p>
            <p>Exemple 2:</p>
            int tabEntiers[6] = {1,2,3};
            <p> -->L'affichage sera: 1,2,3,0,0,0.</p>
          </p>
            </tr>
        </div>
            <p>Deuxième chose très très importante, c'est la taille du tableau ! Ce que je ne t'ai pas encore dit, c'est que le C n'est pas un langage orienté objet !
            </p>     
      `,
];

export default pages;
