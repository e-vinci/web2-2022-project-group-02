import { clearPage, renderPageTitle } from '../../../utils/render';
import API from '../../../utils/api';
import html from '../../../utils/html';
import { renderProgressBar, renderButton } from './util';
import ASMImage from '../../../img/course-asm.webp';
import CImage from '../../../img/course-c.webp';
import { isAuthenticated } from '../../../utils/auths';

const MainPage = () => {
  clearPage();
  renderPageTitle("Vue d'ensemble des leçons");
  renderCourses();
};

const courses = [
  {
    id: 'asm',
    title: 'Assembleur',
    description: 'Langage de très bas niveau, proche du code machine.',
    image: ASMImage,
  },
  {
    id: 'c',
    title: 'C',
    description: 'Langage très connu et révolutionnaire. A connaître absolument !',
    image: CImage,
  },
];

async function getProgress() {
  if (!isAuthenticated()) return null;

  return (await API.GET('/users')).courses;
}

function renderCourses() {
  const main = document.querySelector('main');

  const progress = getProgress();

  const content = html`
    <div class="container">
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
                  <div class="text-end">
                    ${renderButton('Apprendre 👉', `/courses/overview?course=${course.id}`)}
                  </div>
                  <div class="position-relative mt-3">
                    ${progress.then((userCourses) => {
                      const courseProgress =
                        userCourses === undefined
                          ? { progress: 0 }
                          : userCourses?.find((c) => c.id === course.id);

                      return courseProgress ? renderProgressBar(courseProgress.progress) : '';
                    })}
                  </div>
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `;

  main.append(content);
}

export default MainPage;
