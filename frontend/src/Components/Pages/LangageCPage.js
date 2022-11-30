import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';

const LangageCPage = () => {
  clearPage();
  renderPageTitle('Leçons');
  renderCourses();
};

function renderCourses() {
  const main = document.querySelector('main');

  const form = html`
    <form class="p-5">
        <section>
            <div class="container text-center">
                <h1>C facile</h1>
            </div>
            <div id="intro">
            <h2> Introduction </h2>
            <p> Avant de débuter, si tu n’as pas encore des bases en assembleur 
            on te conseille vivement de commencer le cours d’ASM avant de t’attaquer au C ! </p>
            <p> Maintenant que c’est dit, on peut commencer par expliquer c’est quoi le C ? Eh bien, c’est un langage de programmation considéré par la majorité comme bas niveau. 
            <br>
            <div class="right border border-blue" >
                <p> Un langage est dit de bas niveau lorsque le codage de celui-ci se rapproche du langage maternel de l’ordinateur.</p>
                <p> Contrairement au langage haut niveau qui lui est indépendant du matériel, il permet de créer des programmes portables et non liés à un ordinateur ni à une puce. </p>                 
            </div>
            <br>
            Ne t’inquiète pas, on ne va pas écrire en binaire c’est incompréhensible par l’être humain. Ça sera le rôle du compilateur de traduire notre code 
            en langage machine c'est-à-dire en binaire pour que le processeur puisse traiter les instructions. Nous, on pourra écrire dans un langage dit intermédiaire qui est compréhensible par l’homme. 
            <br><br>
            Et c’est le but de ce site ! T’expliquer pas à pas, chaque instruction ce qu’elle fait et cerise sur le gâteau, tu auras des animations pour visualiser ce qu’il se passe au cœur de ta machine !
             ça te permettra de mieux assimiler la logique de programmation.
            </p>
            </div>
            <br><br><br>
            <div >
                <a class="btn btn-primary p-4" aria-current="page" href="#" data-uri="/suite">Suite</a>
            </div>
        </section>
    </form> `;

  main.replaceChildren(form);
}

export default LangageCPage;
