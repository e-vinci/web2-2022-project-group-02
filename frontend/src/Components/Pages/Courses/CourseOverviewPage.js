import { clearPage, renderPageTitle } from '../../../utils/render';
import html from '../../../utils/html';
import { progressColor, renderProgressBar, renderButton } from './util';

const courses = {
  asm: {
    fullTitle: 'Assembleur',
    sections: [
      {
        id: 'asm-intro',
        title: 'Conversion des bases',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 100,
      },
      {
        id: 'asm-registers',
        title: 'Les registres',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 50,
      },
      {
        id: 'asm-instructions',
        title: 'Les instructions',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'asm-stack',
        title: 'La pile',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'asm-flags',
        title: 'Les flags',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'asm-loops',
        title: 'Les boucles',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
    ],
  },
  c: {
    fullTitle: 'Langage C',
    sections: [
      {
        id: 'c-intro',
        title: 'Les types',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'c-variables',
        title: 'Les variables',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'c-functions',
        title: 'Les fonctions',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'c-pointers',
        title: 'Les pointeurs',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'c-structures',
        title: 'Les structures',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
        progress: 0,
      },
      {
        id: 'c-tables',
        title: 'Les tableaux',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus justo laoreet egestas tempor. Donec finibus est sed elit mattis elementum. Cras ut volutpat sapien, vitae luctus massa.',
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

const CoursesOverviewPage = () => {
  const course = getCourse();

  if (!course) {
    document.querySelector('main').innerHTML = 'Leçon non trouvé';
    return;
  }

  clearPage();
  renderPageTitle(`Les leçons - ${course.fullTitle}`);
  renderOverview();
};

function renderOverview() {
  const course = getCourse();

  const highlightedSection = course.sections.findIndex((section) => section.progress < 100);

  const content = html`
    <div class="container">
      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-4 col-lg-6">[Image here]</div>
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
                      ${renderButton(`/courses/course?section=${section.id}`, 'Commencer')}
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

  document.querySelector('main').append(content);
}

export default CoursesOverviewPage;
