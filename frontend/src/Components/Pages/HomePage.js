import html from '../../utils/html';

const HomePage = () => {
  const main = document.querySelector('main');

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
      <p>
        Proin ut lectus ac urna suscipit volutpat bibendum quis lectus. Nunc ullamcorper at ex vitae
        accumsan. Maecenas fringilla tortor quis laoreet fringilla. Mauris sit amet urna arcu.
        Mauris venenatis porta lacus ut rutrum. Nulla ac nulla dolor. Phasellus aliquam nunc ac dui
        blandit, quis condimentum mi vulputate. Nam elementum odio quam, at commodo quam scelerisque
        fringilla. Nunc ac augue vel turpis consectetur lacinia. Mauris ligula ipsum, ultrices vitae
        leo tempor, porta imperdiet nisi. Nunc et pulvinar nulla. Aenean sit amet lacinia mi, sit
        amet molestie libero. Aliquam erat volutpat.
      </p>
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
