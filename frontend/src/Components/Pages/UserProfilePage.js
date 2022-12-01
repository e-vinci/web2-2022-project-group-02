import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import image from '../../img/defaultUser.png';

const user = {
  username: 'Jean-Eud',
  picture: '../../img/defaultUser.png',
  questions: [
    {
      titre: "C'est quoi le temps UNIX?",
      date: '01/01/1970',
    },
    {
      titre: 'Comment mettre la date sur 64-bit ??? (URGENT)',
      date: '19/01/2038',
    },
  ],
  cours: [
    {
      titre: 'ASM',
      chapitre: 1,
    },
    {
      titre: 'C',
      chapitre: 7,
    },
  ],
  highscore: [
    {
      cours: 'ASM',
      score: 69420,
    },
    {
      cours: 'C',
      score: 713705,
    },
  ],
};

function getHighScores() {
  const scores = document.createElement('ul');
  user.highscore.forEach((score) => {
    const li = document.createElement('li');
    li.innerHTML = `${score.cours} - ${score.score}`;
    scores.appendChild(li);
  });
  return scores;
}
const profilePicture = document.createElement('img');
profilePicture.setAttribute('src', image);
profilePicture.setAttribute('width', '35%');
profilePicture.addEventListener('click', () => {
  alert('change profile picture!');
  // something to change profile picture
});

const userName = document.createElement('form');
userName.setAttribute('class', 'vertical centered');
const userNameButton = document.createElement('input');
userNameButton.setAttribute('type', 'submit');
userNameButton.setAttribute('value', user.username);
userNameButton.setAttribute('class', 'btn btn-info margin');
userNameButton.addEventListener('click', () => {
  alert('Change User Name!');
});

const forgetMe = document.createElement('input');
forgetMe.setAttribute('type', 'submit');
forgetMe.setAttribute('value', 'delete my acount');
forgetMe.setAttribute('class', 'btn btn-info margin');
forgetMe.addEventListener('click', () => {
  alert('I forgor 💀');
});
userName.appendChild(userNameButton);
userName.appendChild(forgetMe);

function getCours() {
  const listeCours = document.createElement('ul');
  user.cours.forEach((cours) => {
    const li = document.createElement('li');
    li.innerHTML = `${cours.titre} : chapitre ${cours.chapitre}`;
    listeCours.appendChild(li);
  });
  return listeCours;
}

function getQuestions() {
  const q = document.createElement('ul');
  user.questions.forEach((question) => {
    const li = document.createElement('li');
    li.innerHTML = `${question.date} | ${question.titre}`;
    q.appendChild(li);
  });
  return q;
}

const ProfilePage = async () => {
  clearPage();
  renderPageTitle('Profil');
  renderProfile();
};
function renderProfile() {
  const main = document.querySelector('main');

  const profile = html`
    <div class="container horizontal centered">
      <div class="container vertical centered">${profilePicture} ${userName}</div>
      <div class="container vertical userSettings">
        <div class="container centered vertical cell">
          <h5>High Scores</h5>
          ${getHighScores()}
        </div>
        <div class="container centered vertical cell">
          <h5>Cours</h5>
          ${getCours()}
        </div>
        <div class="container centered vertical cell">
          <h5>Question Posées</h5>
          ${getQuestions()}
        </div>
      </div>
    </div>
  `;
  main.replaceChildren(profile);

  const highscores = document.querySelector('highscores');
  highscores.replaceChildren('prout');
}

export default ProfilePage;
