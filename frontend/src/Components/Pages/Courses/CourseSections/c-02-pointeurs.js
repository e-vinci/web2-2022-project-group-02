import html from '../../../../utils/html';
// import warning from '../../../../img/warning.gif';
// import CodeDemo from '../CodeDemoElement';
// import CCodeRunner from '../../../CodeRunner/CCodeRunner';

const pages = [
  () => html`
  <h1>2 - *Les pointeurs</h1>
  <br>
  <div>
    <p>
        <p>Que la partie fun commence ! *sarcasme ON* &#128520; ! Tu vas utiliser tellement d'étoiles que tu vas te perdre dans l'espace. * OKKK JE CONNAIS LA SORTIE BYYYEEE! Bonne chance pour trouver qlq'un pour t'expliquer la suite hein *</p> 
       
       <p>Non c'est bon, je suis là ! LETSGOOO !!!</p>
        <p> Je vais commencer à l'envers, et aller droit au but. <strong> Un pointeur c'est une variable qui contient une adresse mémoire.</strong></p>
        <p>Qui dit manipulation d'adresse dit être très <strong>vigilent</strong>.. si tu as le malheur de perdre l'adresse où débute ta variable FINITO ! Tu es CUITS l'ami !  </p>
        <p>Tiens j'aimerai te faire présenter à quelqu'un de très cher. Tous les programmeurs/ses en C le connaissent, certains le décrivent comme spontané, d'autre comme lourd. Tu jugeras par toi même !
        <br> Jusque là, il fait que dormir paisiblement, et il se doit de rester en phase de sommeil, jamais Jamais <strong>JAMAIS(!!!)</strong> tu essaies de le réveiller, do you hear me?! 
       </p>
       
       
        <p>Qu'est ce qu'il peut bien le réveiller tu vas me demander ? Très bonne question, il se trouve que dès qu'on manipule des pointeurs, il pointe le bout de son nez ! </p>
        <p>Oui ce monstre tu vas le rencontrer plus que ton propre entourage, moi je te dis ! Et il a un nom ce monstre, of course.</p>
        <p>J'ai l'immense joie et plaisir de te présenter à ton nouveau calvaire, <strong>Segmentation fault</strong>, *t'entends le rire de sorcière en fond ? * &#128520;</p>
    </p>
  </div>
  `,
  () => html`
    <h4 class="heavy">Comprendre la notion d'adresse</h4>
    <br />
    <p>
      Donc on avait dit qu'un pointeur est une variable qui permet de stocker une adresse (on dit
      aussi le pointeur référence vers sa donnée), en fait c'est ainsi que fonctionne l'ordinateur.
    </p>
    <p>
      Je m'explique, pour chaque variable déclarée, il lui réserve l'espace mémoire en fonction du
      type de la variable et stock l'adresse de cet espace pour pouvoir lui assigner les valeurs
      demander par le programmeur. Cette utilisation des références est dite implicite. Mais avec
      les pointeurs, elle doit être explicite.
    </p>
    <div class="horizontal">
      <div class="vertical">
        <p>
          Voilà un magnifique tableau d'adresse, la 1ère colonne c'est l'adresse où sont stocker les
          variables et pointeurs et la 2ème le contenu de l'adresse.
        </p>
        +---------+---------+ <br />
        | Adresse | Contenu |<br />
        +---------+---------+<br />
        | @0x124 &nbsp; | &nbsp;&nbsp;&nbsp; -5&nbsp;&nbsp;&nbsp;&nbsp; |<br />
        +---------+---------+<br />
        | @0x120 &nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 &nbsp;&nbsp;&nbsp; |<br />
        +---------+---------+<br />
        | @0x116 &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-10 &nbsp;&nbsp; |<br />
        +---------+---------+<br />
        |@0x112&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;@0x3548 |<br />
        +--------+----+----+<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+_________+<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br />
        +----V----+---------+<br />
        |@0x3548 |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br />
        +---------+---------+<br />
        |@0x3544 |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;|<br />
        +---------+---------+<br />
        |@0x3540 |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;|<br />
        +---------+---------+<br />
        <p>
          Donc on remarque qu'à l'adresse @0x112 son contenu est une adresse également. On comprend
          tout de suite que c'est un pointeur, qui référence vers son contenu, qui est un tableau.
        </p>
        <p>
          Oui oui ! Voilà à quoi servent les pointeurs, à créer des tableaux de façon dynamique.
        </p>
      </div>
    </div>
  `,
  () => html``,
  () => html``,
  () => html`
    <h5>En résumé</h5>
    <div>
      Un pointeur est une variable dont le contenu est une adresse; L’opérateur d’adressage & permet
      de récupérer l’adresse d’une variable; Un pointeur d’un type peut uniquement contenir
      l’adresse d’un objet du même type; Un pointeur nul contient une adresse invalide qui dépend de
      votre système d’exploitation; Un pointeur nul est obtenu en convertissant zéro vers un type
      pointeur ou en recourant à la macroconstante NULL. L’opérateur d’indirection (*) permet
      d’accéder à l’objet référencé par un pointeur; En cas de retour d’un pointeur par une
      fonction, il est impératif de s’assurer que l’objet référencé existe toujours; Le type void
      permet de construire des pointeurs génériques; L’indicateur de conversion %p peut être utilisé
      pour afficher une adresse. Une conversion vers le type void * est pour cela nécessaire. Alors
      à partir de maintenant, je veux que tu lises mes mots et rien que mes mots. Je veux toute ton
      attention sur ce que je vais m'apprêter à te dire.<br />
    </div>
  `,
];

export default pages;
