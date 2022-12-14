import image from '../../img/cats/chat1.png';
import { getAuthenticatedUser } from '../../utils/auths';
import html from '../../utils/html';
import navigate from '../Router/Navigate';

const btnASM = document.createElement('a');
btnASM.setAttribute('class', 'btn btn-primary p-4');
btnASM.setAttribute('aria-current', 'page');
btnASM.setAttribute('href', '#');
btnASM.setAttribute('data-uri', '/asm');
btnASM.innerHTML = 'Assembleur';
btnASM.addEventListener('click', () => {
  navigate('/courses/overview?course=asm');
});

const btnC = document.createElement('a');
btnC.setAttribute('class', 'btn btn-primary p-4');
btnC.setAttribute('aria-current', 'page');
btnC.setAttribute('href', '#');
btnC.setAttribute('data-uri', '/Cfacile');
btnC.innerHTML = 'Langage C';
btnC.addEventListener('click', () => {
  navigate('/courses/overview?course=c');
});

const HomePage = async () => {
  const main = document.querySelector('main');
  const user = getAuthenticatedUser();

  const homepage = html`
    <div class="hero" style="background-color: rgb(194, 255, 194);">
      <div class="container">
        ${user
          ? html`
              <h1>Salut ${user.username} ! Prêt pour de nouveaux défis ?</h1>
              <p>
                Que tu sois débutant ou expert, tu trouveras forcément ton bonheur sur CatByte !
              </p>
              <p>
                Pourquoi ne pas commencer par un cours ? Ou peut-être que tu préfères te lancer dans
                le Miaouwrathon ?
              </p>
            `
          : html`
              <h1>Bienvenue sur CatByte</h1>

              <p>
                Sur ce site, tu peux apprendre la théorie tout en pratiquant ! Pour plus de fun, on
                te conseille de t'inscrire pour débloquer le Miaouwrathon et de pouvoir reprendre
                tes leçons là où tu t'es arrêté !
              </p>
            `}
      </div>
    </div>
    <div class="container">
      <div class="alert" id="blagWobsite">Chargement d'un blague...</div>
    </div>
    <div class="container text-center">
      <h3 class="vertical-space">Suggestion des cours</h3>
      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-4">${btnASM}</div>
        <div class="col-12 col-md-4">${btnC}</div>
      </div>
      <br />
      <img class="picture1" src="${image}" />
    </div>
  `;

  main.replaceChildren(homepage);

  loadJoke();
};

async function loadJoke() {
  try {
    const joke = await (
      await fetch(
        'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single',
      )
    ).json();

    document.getElementById('blagWobsite').replaceChildren(
      html`
        <h4 class="heavy">Blague du click !</h4>
        <h6>Catégorie: ${joke.category}</h6>
        <q>${joke.joke}</q>
      `,
    );
  } catch (e) {
    document.getElementById('blagWobsite').remove();
  }
}

export default HomePage;
