import html from '../../../../utils/html';

const pages = [
  html`
    <h1 class="centered">0 - Introduction à l'Assembleur</h1>
    <p>
      Les ordinateurs sont un peu bêtes, du coup ils ne comprennent que le binaire, tant pour les
      données qu'ils traitent que pour les programmes qu'ils exécutent.
    </p>
    <p>
      Ces programmes sont composés d'instructions simples, par exemple 0x90, 0xF8, etc. C'est ce
      qu'on appelle du "Language Machine" Le problème, c'est que ces nombres sont stockés sous forme
      binaire ou hexadécimale, ce qui est dur à lire pour un humain.
    </p>
    <p>
      Pour rendre la programmation plus accessible, des noms ont donc été donnés à ces instruction,
      et pour chaque nom d'instruction correspond un "op code". Nos instructions deviennent donc
      NOP, CLC, etc. C'est déja mieux. En plus des noms d'instructions, des fonctionnalités
      permettant de faciliter la programmation ont aussi été ajoutées. Nous appelons ce nouveau
      language L'assembleur.
    </p>
    <div class="notabene centered">
      <p>
        N.B. Il n'éxiste pas qu'un langage assembleur. Les langages assembleurs sont une abstraction
        du fonctionnement électrique du processeur, des processeurs différents ont donc des
        assembleurs différents.
      </p>
    </div>
    <div class="notabene centered">
      <p>
        N.B. 2 une même instruction (par exemple MOV) peut correspondre à plusieurs opcodes. En
        effet, certaines instructions impliquent des informations supplémentaires, comme le mode
        d'adressage, et l'opcode est différent pour chacune des variation de cette instruction.
      </p>
    </div>
  `,
  html`
        <h1>Introduction</h1>
        <p>holo</br>peve</p>
    `,
];

export default pages;
