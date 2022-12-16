import html from '../../../../utils/html';
import warning from '../../../../img/warning.gif';
import CodeDemo from '../CodeDemoElement';
import CCodeRunner from '../../../CodeRunner/CCodeRunner';

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
              html` <p >
        <strong>Attention</strong> il y a une faute très grave ici, cherche avant de continuer de lire !<br>
           ... <br>
           Alors ?<br><br>
           <-- regarde ici... oui i commence de 0 jusque 5 donc il va arriver à tab[5] alors qu'il n'y a que 5 valeurs dans le tableau. Jusque là tu vas me dire qu'il n'y a pas le feu, le compilateur va génèrer une erreur, comme en Java.<br>
            <strong>Eh bien NON !! Oublie Java, le langage C n'impose pas à une implémentation de vérifier les accès, en écriture comme en lecture, hors des limites d'un tableau.</strong>
            <p> C'est-à-dire qu'il n'y a pas de vérification ni à la compilation ni durant l'éxecution que l'indice reste dans les limites de l'index, à savoir [0, TAILLE-1]. </p>
            <p>Donc il faut être très très attentif au code, c'est la faiblesse du C. Il va simplement afficher une valeur random à la position tab[5] (ce qui se trouve dans la mémoire). </p>
          </p>

          <p id="test"></p>`,
            )}
          </div>
          <br />
          <div id="NB" class="notabene centered">
            <p class="heavy">
              Attention ! Quand tu déclares un tableau statique, comme l'exemple plus haut, tu ne
              peux plus modifier ses valeurs, cela va générer une segmentation fault !
              <br /><br />
              En fait c'est parce que les valeurs statiques sont stockés dans la partie Read-Only de
              la mémoire, et donc c'est uniquement accessible à la lecture. On utilise rarement les
              variables statiques mais c'est une information tout de même utile.
            </p>
          </div>
          <br />
          <p>-> L'autre manière est de passer par le #define:</p>

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
          <table>
            <tbody>
              <tr>
                <td>
                  <img src="${warning}" />
                </td>
                <td>
                  <ul>
                    <li class="heavy">
                      A la déclaration, les valeurs entre accolades doivent être des #defines
                      (l'utilisation de simple variables ou const provoquera une erreur du
                      compilateur),
                    </li>
                    <li class="heavy">
                      Si le nombre de valeurs entre accolades est inférieur au nombre d'éléments du
                      tableau, les derniers éléments seront initialisés aux valeurs par défaut
                      dépendant de leur type (plus de détails à la page suivant),
                    </li>
                    <li class="heavy">Il doit y avoir au moins une valeur entre accolades,</li>
                    <li class="heavy">
                      Le nombre de valeurs entre accolades ne doit pas être supérieur au nombre
                      d'éléments du tableau. (le compilateur ne va pas générer d'erreur, plus de
                      détails à la page suivante).
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
        <h3>Deux points très important à savoir concernant les tableaux:</h3><br>
        <p>La <strong>première</strong> étant les valeurs non initialisés auront comme valeur dépendant de leurs types:</p>
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
            <p><strong>Deuxième</strong> chose très très importante, c'est la taille du tableau ! Ce que je ne t'ai pas encore dit, c'est que le C n'est pas un langage orienté objet ! Donc tab.length à l'oubliette !
              <br> C'est la responsabilité au développeur/se de stocker la taille du tableau dans une variable.
           <br> <p class="heavy">Le compilateur ne nous corrige pas, à tel point que le risque d'erreur est énorme.</p>
            </p> 
            
            <h1>À toi de jouer !</h1>
    <div class="horizontal">
      <div class="vertical">
        <p>Déclare un tableau de taille 10 qui stocke uniquement les nombres paires <= 20 et ensuite affiche le ! Utilise le #define pour le taille.</p>
        ${CCodeRunner({
          code: `#include <stdio.h>
   
int main() {
  //Déclarer le tableau
  int nb = 20;

  for( ; ; ){
  // initialiser 
  printf("%d,", );//afficher
  }
  return 0;
}`,
          tests: [
            {
              args: [''],
              output: '2,4,6,8,10,12,14,16,18,20,',
            },
          ],
        })}
      </div>
    </div>
  `,
  () => html`
    <h1>À toi de jouer !</h1>
    <div class="horizontal">
      <div class="vertical">
        <p>
          Déclare un tableau de bool de taille 10 qui stocke met à true uniquement les indices
          paires < 10 ! Utilise le #define pour la taille et < stdbool.h > dans le #include pour
          utiliser la libraire des booléens.
        </p>
        ${CCodeRunner({
          code: `#include <stdio.h>
   
  int main() {
    //Déclarer le tableau

    for( ; ; ){
    // initialiser 
    }

    //affichage
    for( int i = 0; i < TAILLE; i++ ){
      printf("%s,", tab[i] ? "true" : "false");
    }
    return 0;
  }`,
          tests: [
            {
              args: [''],
              output: 'true,false,true,false,true,false,true,false,true,false,',
            },
          ],
        })}
      </div>
    </div>
  `,
  () => html`
    <h1>Les matrices</h1>

    <p>Attache ta ceinture, ça va swiiinguer ! &#128526;</p>

    <p>
      C'est un tableau d'un tableau ou plutôt un tableau qui pointe vers un tableau, exemples:<br />
      - int matrice[N][N]={0}; &nbsp; &nbsp; (où N a été déclaré dans le #define). <br />
      - int tab[4][5] = {{1,2,3},{3,4}}; &nbsp; &nbsp;(le reste est initialisé à 0).
    </p>

    <p>Sinon, la logique reste la même, le parcours se fait avec 2 boucles imbriquées.</p>
    <p>Voici un exemple complet:</p>
    <div class="centered">
      ${CodeDemo(
        `#include <stdio.h>

#define N 50

int main() {
  int tab[N][N]= {0};
  
  for(int i = 0; i < N ; i++){
    for(int j = 0; j < N , j++){
      tab[i][j] = j;
      printf("%d", tab[i][j]);
    }
  }
    return 0;
}`,
        html` <p>
            <br /><br /><br /><br /><br /><br /><br />
            Rien de particulier à dire pour les matrices, ce sont les mêmes règles que le tableau.
            Toujours être attentif à la bonne gestion de la taille du tableau et de l'indice.
            <br />
          </p>

          <p id="test"></p>`,
      )}
    </div>
  `,
  () => html`
    <h1>À toi de jouer !</h1>
    <div class="horizontal">
      <div class="vertical">
        <p>
          <br />Affiche la table de multiplication de 1 à 10. Veille bien à utiliser le #define pour
          la taille du tableau
        </p>
        ${CCodeRunner({
          code: `#include <stdio.h>
/*
POST: affiche la table
de multiplication de 1 à 10.
*/
void main() {
  //Déclarer
  
  //Initialiser et afficher    
  
  printf("%3d", );
}`,
          tests: [
            {
              args: [''],
              output:
                '1 2 3 4 5 6 7 8 9 10 2 4 6 8 10 12 14 16 18 20 3 6 9 12 15 18 21 24 27 30 4 8 12 16 20 24 28 32 36 40 5 10 15 20 25 30 35 40 45 50 6 12 18 24 30 36 42 48 54 60 7 14 21 28 35 42 49 56 63 70 8 16 24 32 40 48 56 64 72 80 9 18 27 36 45 54 63 72 81 90 10 20 30 40 50 60 70 80 90 100 ',
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
        <br />
        Il se peut que ton code soit fonctionnel, mais juste pour un espace, ton output et celui
        qu'on a intégré dans le code ne soient pas les mêmes et qui fait que ça marque en rouge !
        <br />
        <br />À ce moment là, c'est mieux que tu vérifies par toi même, si le résultat est le même.
      </p>
    </div>
  `,
];

export default pages;
