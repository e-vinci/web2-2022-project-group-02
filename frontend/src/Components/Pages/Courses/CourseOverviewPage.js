import { clearPage, renderPageTitle } from '../../../utils/render';
import html from '../../../utils/html';
import { progressColor, renderProgressBar, renderButton } from './util';
import cEasy from '../../../img/c-facile-logo.png';
import meow from '../../../img/cats/chat2.png';

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
        chapter: 0,
        progress: null,
      },
      {
        id: 'asm-01-hardware',
        title: 'Le matériel',
        description: 'Influance du hardware sur le langage assembleur',
        chapter: 1,
        progress: null,
      },
      {
        id: 'asm-02-execution',
        title: "L' exécution d'un programme",
        description: 'How the computer goes beep boop',
        chapter: 2,
        progress: null,
      },
      {
        id: 'asm-03-mode-adressage',
        title: "Les modes d'adressage",
        description: "Les pages jaunes de l'ordinateur",
        chapter: 3,
        progress: null,
      },
      {
        id: 'asm-04-flags',
        title: 'Les flags',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.',
        chapter: 4,
        progress: null,
      },
      {
        id: 'asm-05-boucles',
        title: 'Les boucles',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        chapter: 5,
        progress: null,
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
        chapter: 0,
        progress: null,
      },
      {
        id: 'c-01-tableaux',
        title: 'Les tableaux',
        description: 'Objectif: apprendre a manipuler un tableau + 3 exercices',
        chapter: 1,
        progress: null,
      },
      {
        id: 'c-02-pointeurs',
        title: 'Les pointeurs',
        description:
          "Objectif: comprendre l'utilité des pointeurs et savoir les manipuler + 3 exercices.",
        chapter: 2,
        progress: null,
      },
      {
        id: 'c-03-chars',
        title: 'Les chaînes de caractères',
        description: 'Objectif: savoir manipuler un tableau de chaîne de caractères + 3 exercices.',
        chapter: 3,
        progress: null,
      },
      {
        id: 'c-04-functions',
        title: 'Les fonctions',
        description: 'Objectif: être capable de décortiquer son code + 3 exercices.',
        chapter: 4,
        progress: null,
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

  fetchUserProgress(course);
};

async function fetchUserProgress(course) {
  const user = getAuthenticatedUser();

  if (!user) return;

  const urlParams = new URLSearchParams(window.location.search);
  const titreCours = urlParams.get('course');
  let userProgress = {
    title: course,
    chapter: 0,
    progress: 0,
    score: 0,
  };

  userProgress = await API.GET('/users/progress', {
    course: titreCours,
  });

  const sectionList = [];

  for (let i = 0; i < course.sections.length; i += 1) {
    let progress = 0;
    let currentPage = 0;
    if (course.sections[i].chapter < userProgress.chapter) {
      progress = 100;
    }
    if (course.sections[i].chapter === userProgress.chapter) {
      progress = userProgress.progress;
      currentPage = userProgress.page;
    }

    sectionList.push({
      id: course.sections[i].id,
      title: course.sections[i].title,
      description: course.sections[i].description,
      chapter: course.sections[i].chapter,
      progress,
      page: currentPage,
    });
  }

  renderOverview({
    ...course,
    sections: sectionList,
  });
}

async function renderOverview(course) {
  const highlightedSection = course.sections.findIndex((section) => section.progress < 100);
  const content = html`
    <div class="container">
      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-4 col-lg-6">
          ${new URLSearchParams(window.location.search).get('course') === 'c'
            ? html`<img src="${cEasy}" width="80%" />`
            : html`<img src="${meow}" width="80%" />`}
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
                    ${section.title}
                    ${section.progress === null
                      ? ''
                      : html`
                          <span>
                            &nbsp;-&nbsp;
                            <span class="text-${progressColor(section.progress)}">
                              ${section.progress}%
                            </span>
                          </span>
                        `}
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
                      <div class="flex-grow-1">
                        ${section.progress === null
                          ? html`&nbsp;`
                          : html` ${renderProgressBar(section.progress)} `}
                      </div>
                      ${renderButton(
                        'Commencer',
                        `/courses/course?section=${section.id}#${section.page || 1}`,
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
