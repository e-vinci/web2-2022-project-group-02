import { clearPage, renderPageTitle } from '../../../utils/render';
import ASMImage from '../../../img/course-asm.webp';
import CImage from '../../../img/course-c.webp';
import html from '../../../utils/html';

const CoursesPage = () => {
  clearPage();
  renderPageTitle('Leçons');
  renderCourses();
};

const courses = [
  {
    title: 'Assembleur',
    description: 'Langage de très bas niveau, proche du code machine.',
    image: ASMImage,
    progress: 0,
  },
  {
    title: 'C',
    description: 'Langue très connue et révolutionnaire. A connaître absolument !',
    image: CImage,
    progress: 0,
  },
];

function renderCourses() {
  const main = document.querySelector('main');

  const content = html`
    <div class="container">
      <h3 class="text-center">Vue d'ensemble des leçons</h3>
      <div class="row justify-content-center g-4">
        ${courses.map(
          (course) => html`
            <div
              class="col-12 col-md-${Math.round(
                (12 / courses.length) * 0.75,
              )} d-flex align-items-stretch"
            >
              <div class="card">
                <img src="${course.image}" class="card-img-top" alt="${course.title}" />
                <div class="card-body">
                  <h5 class="card-title">${course.title}</h5>
                  <p class="card-text">${course.description}</p>
                  <a href="#" class="btn btn-primary">Apprendre 👉</a>
                  <div class="position-relative my-3">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style="width: ${course.progress}%"
                      >
                        ${course.progress}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `;

  main.replaceChildren(content);
}

export default CoursesPage;
