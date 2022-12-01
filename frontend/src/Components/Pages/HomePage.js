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
btnC.innerHTML = 'Language C';
btnC.addEventListener('click', () => {
  navigate('/courses/overview?course=c');
});

const HomePage = async () => {
  const main = document.querySelector('main');
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
  const joke = await response.json();

  const homepage = html`
    <div class="hero bg-secondary text-white">
      <div class="container">
        <h1>Bienvenue sur CatByte</h1>

        <p>
          Sur ce site, tu peux apprendre la théorie tout en pratiquant ! Pour plus de fun, on te
          conseille de t'inscrire pour bénéficier des défis, de poser tes question sur le forum
          aussi de pouvoir reprendre tes leçons là où tu t'es arrêté !
        </p>
      </div>
    </div>
    <div class="container">
        <div class="alert alert-info">
        <p>
            Blague du jour:
        </p> 
          <h6>Catégorie: ${joke.category}</h6>
          <q>${joke.joke}</q>
        </div>
  </div>
    </div>
    <div class="container text-center">
      <h3>Suggestion des cours</h3>
      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-4">
        ${btnASM}
        </div>
        <div class="col-12 col-md-4">
        ${btnC}
        </div>
      </div>
    </div>
  `;

  main.replaceChildren(homepage);
};

export default HomePage;
