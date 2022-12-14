import html from '../../../../utils/html';

const pages = [
  () => html`
      <h1>Les tableaux en C</h1>
     <br>
    Avant d'entrer dans le vif du sujet, il faut que je t'explique les constantes. Comment on déclare les constantes en C ?
    <br> <br>
    Simple ! <br><br>
    Il y a 2 manières de déclarer une constante: <br>
    - Soit avec un 'const' , exemple, const int TVA = 21; <br>
    - Soit via la directive au préprocesseur '#define' (constante symbolique): #define TVA 21
    <br><p class = "heavy"> Attention le define on l'écrit après les includes et avant le main !</p>
    <br><br>
      <p>Voilà que c'est expliqué, maintenant pour la déclarer un tableau rien de bien compliquer, juste faut être très très intentif. <br>
      <br> Exemple: <br>
      int tab [5] = {1, 56, 21, 11, 7}</p>
      
     
      </div>
    `,
];

export default pages;
