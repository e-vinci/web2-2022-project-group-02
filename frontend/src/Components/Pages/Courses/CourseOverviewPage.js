import { clearPage, renderPageTitle } from '../../../utils/render';
import html from '../../../utils/html';
import { progressColor, renderProgressBar, renderButton } from './util';
import cEasy from '../../../img/c-facile-logo.png';
import { getAuthenticatedUser } from '../../../utils/auths';
import API from '../../../utils/api';

const courses = {
  asm: {
    fullTitle: 'Assembleur',
    sections: [
      {
        id: 'asm-00-intro',
        title: 'Introduction',
        description: 'introduction rapide au langage assembleur',
        chapitre: 0,
        progress: 0,
      },
      {
        id: 'asm-01-hardware',
        title: 'Le matériel',
        description: 'Influance du hardware sur le langage assembleur',
        chapitre: 1,
        progress: 0,
      },
      {
        id: 'asm-02-execution',
        title: "L' exécution d'un programme",
        description: 'How the computer goes beep boop',
        chapitre: 2,
        progress: 0,
      },
      {
        id: 'asm-03-mode-adressage',
        title: "Les modes d'adressage",
        description: "Les pages jaunes de l'ordinateur",
        chapitre: 3,
        progress: 0,
      },
      {
        id: 'asm-04-flags',
        title: 'Les flags',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.',
        chapitre: 4,
        progress: 0,
      },
      {
        id: 'asm-05-boucles',
        title: 'Les boucles',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        chapitre: 5,
        progress: 0,
      },
    ],
  },
  c: {
    fullTitle: 'Langage C',
    sections: [
      {
        id: 'c-00-intro',
        title: "S'initier en C",
        description:
          'Objectif: comprendre chaque ligne du code (les includes, les types) + 2 petits exercices pour bien démarrer',
        chapitre: 0,
        progress: 0,
      },
      {
        id: 'c-01-tableaux',
        title: 'Les tableaux',
        description: 'Objectif: apprendre a manipuler un tableau + 3 exercices',
        chapitre: 1,
        progress: 0,
      },
      {
        id: 'c-02-pointeurs',
        title: 'Les pointeurs',
        description:
          "Objectif: comprendre l'utilité des pointeurs et savoir les manipuler + 3 exercices.",
        chapitre: 2,
        progress: 0,
      },
      {
        id: 'c-04-chars',
        title: 'Les chaînes de caractères',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        chapitre: 3,
        progress: 0,
      },
      {
        id: 'c-05-functions',
        title: 'Les fonctions',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',

        chapitre: 4,
        progress: 0,
      },
    ],
  },
};

const getCourse = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const course = urlParams.get('course');
  if (!course || !courses[course]) return null;

  return courses[course];
};

const CoursesOverviewPage = async () => {
  const course = getCourse();

  if (!course) {
    document.querySelector('main').innerHTML = 'Leçon non trouvé';
    return;
  }

  await renderOverview(course);
};

async function updateUserProgres(cours) {
  const urlParams = new URLSearchParams(window.location.search);
  const user = getAuthenticatedUser();
  const titreCours = urlParams.get('course');
  let userProgress = {
    titre: cours,
    chapitre: 0,
    progres: 0,
    score: 0,
  };
  if (user !== undefined) {
    userProgress = await API.POST('/users/getProgress', {
      username: user.username,
      cours: titreCours,
    });
  }

  const listeCours = [];

  for (let i = 0; i < cours.sections.length; i += 1) {
    let progress = 0;
    let currentPage = 0;
    if (cours.sections[i].chapitre < userProgress.chapitre) {
      progress = 100;
    }
    if (cours.sections[i].chapitre === userProgress.chapitre) {
      progress = userProgress.progres;
      currentPage = userProgress.page;
    }
    listeCours.push({
      id: cours.sections[i].id,
      title: cours.sections[i].title,
      description: cours.sections[i].description,
      chapitre: cours.sections[i].chapitre,
      progress,
      page: currentPage,
    });
  }

  return listeCours;
}

async function renderOverview(course) {
  // eslint-disable-next-line no-param-reassign
  course.sections = await updateUserProgres(course);

  const highlightedSection = course.sections.findIndex((section) => section.progress < 100);
  const content = html`
    <div class="container">
      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-4 col-lg-6">
          ${new URLSearchParams(window.location.search).get('course') === 'c'
            ? html`<img src="${cEasy}" width="80%" />`
            : html`[ASM IMAGE]`}
        </div>
        <div class="col-12 col-md-8 col-lg-6 accordion" id="courseSections">
          ${course.sections.map(
            (section, index) => html`
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                  <button
                    class="accordion-button ${index !== highlightedSection ? 'collapsed' : ''}"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}"
                    aria-expanded="true"
                    aria-controls="collapse${index}"
                  >
                    ${section.title}&nbsp;-&nbsp;<span
                      class="text-${progressColor(section.progress)}"
                      >${section.progress}%</span
                    >
                  </button>
                </h2>
                <div
                  id="collapse${index}"
                  class="accordion-collapse collapse ${index === highlightedSection ? 'show' : ''}"
                  aria-labelledby="heading${index}"
                  data-bs-parent="#courseSections"
                >
                  <div class="accordion-body">
                    <p>${section.description}</p>
                    <div class="d-flex gap-4 align-items-end">
                      <div class="flex-grow-1">${renderProgressBar(section.progress)}</div>
                      ${renderButton(
                        'Commencer',
                        `/courses/course?section=${section.id}#${section.page}`,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `;

  clearPage();
  renderPageTitle(`${course.fullTitle} - les leçons`);
  document.querySelector('main').append(content);
}

export default CoursesOverviewPage;
