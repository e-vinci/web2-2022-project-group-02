import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import Navigate from '../../Router/Navigate';

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
  // new URLSearchParams(window.location.search).get("course")
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
  renderOverview();
};

function renderButton(link) {
  const btn = html` <a href="#" class="btn btn-primary">Apprendre 👉</a> `;

  btn.onclick = () => Navigate(link);

  return btn;
}

function renderOverview() {
  const course = getCourse();

  const content = html`
    <div class="container">
      <h3 class="text-center">Les leçons - ${course.fullTitle}</h3>
      <div class="accordion" id="courseSections">
        ${course.sections.map(
          (section, index) => html`
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${index}">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse${index}"
                  aria-expanded="true"
                  aria-controls="collapse${index}"
                >
                  ${section.title}&nbsp;-&nbsp;<span
                    class="text-${section.progress === 100 ? 'success' : 'danger'}"
                    >${section.progress}%</span
                  >
                </button>
              </h2>
              <div
                id="collapse${index}"
                class="accordion-collapse collapse"
                aria-labelledby="heading${index}"
                data-bs-parent="#courseSections"
              >
                <div class="accordion-body">
                  <p>${section.description}</p>
                  ${renderButton(`/courses/course?section=${section.id}`)}
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `;

  document.querySelector('main').replaceChildren(content);
}

export default CoursesOverviewPage;
