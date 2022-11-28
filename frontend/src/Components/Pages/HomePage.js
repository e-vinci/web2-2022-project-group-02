import html from '../../utils/html';

const HomePage = async () => {
  const main = document.querySelector('main');
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
  const joke = await response.json();

  const hero = html`
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet dictum nibh. Aliquam
        id congue ante, sed vulputate felis. Cras dictum rutrum est. Quisque sit amet lectus non
        magna ornare luctus in vel tortor. Fusce at nulla velit. Nullam a sodales mauris, eu
        imperdiet dolor. Nunc egestas quam augue, quis condimentum tellus interdum non. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in
        sollicitudin nisi, eu semper erat. Mauris ac rhoncus neque.
      </p>
      
        <div class="alert alert-info">
        <p>
            Blague du jour:
        </p> 
          <h6>${joke.category}</h6>
          <q>${joke.joke}</q>
        </div>
  </div>
    </div>
    <div class="container text-center">
      <h3>Suggestion des cours</h3>
      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-4">
          <a class="btn btn-primary p-4" href="#">Commencer leçon<br />Langage C</a>
        </div>
        <div class="col-12 col-md-4">
          <a class="btn btn-primary p-4" href="#">Commencer leçon<br />ASM</a>
        </div>
      </div>
    </div>
  `;

  main.replaceChildren(hero);
};

export default HomePage;
