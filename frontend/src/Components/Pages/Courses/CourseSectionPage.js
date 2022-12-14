import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import { renderButton } from './util';

import C00 from './CourseSections/c-00-intro';
// eslint-disable-next-line import/no-named-as-default
import C01 from './CourseSections/c-01-tableaux';
import C99 from './CourseSections/c-99-coderunner-test';
import ASM00 from './CourseSections/asm-00-intro';
import ASM01 from './CourseSections/asm-01-hardware';
import ASM02 from './CourseSections/asm-02-execution';
import ASM03 from './CourseSections/asm-03-mode-adressage';
import ASM04 from './CourseSections/asm-04-flags';

const sections = {
  c: [
    ['c-00-intro', C00],
    ['c-01-tableaux', C01],
    ['c-99-coderunner-test', C99],
  ],
  asm: [
    ['asm-00-intro', ASM00],
    ['asm-01-hardware', ASM01],
    ['asm-02-execution', ASM02],
    ['asm-03-mode-adressage', ASM03],
    ['asm-04-flags', ASM04],
  ],
};

const getSection = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sectionKey = urlParams.get('section');
  const section = Object.entries(sections)
    .find((course) => sectionKey.startsWith(course[0]))[1]
    .find((s) => s[0] === sectionKey);

  if (!section) return null;

  return section[1];
};

const CoursesSectionPage = () => {
  const section = getSection();

  if (!section) {
    document.querySelector('main').innerHTML = 'Section non trouvé';
    return;
  }

  clearPage();
  // TODO
  // renderPageTitle(``);
  renderSection();
};

function renderSection() {
  const section = getSection();

  let pageNum = parseInt(window.location.hash.replace('#', ''), 10);
  if (Number.isNaN(pageNum)) pageNum = 1;
  if (pageNum < 1 || pageNum >= section.length + 1) pageNum = 1;
  pageNum -= 1;

  let page = section[pageNum]();
  let func = () => {};
  if (Array.isArray(page)) {
    [page, func] = page;
  }

  const content = html`
    <div class="container">
      ${page}

      <div class="mt-5 d-flex justify-content-center gap-3">
        ${renderButton(
          'Précédent',
          () => {
            window.history.replaceState(undefined, undefined, `#${pageNum}`);
            CoursesSectionPage();
          },
          pageNum === 0,
        )}
        ${renderButton(
          'Suivant',
          () => {
            window.history.replaceState(undefined, undefined, `#${pageNum + 2}`);
            CoursesSectionPage();
          },
          pageNum >= section.length - 1,
        )}
      </div>
      ${pageNum === section.length - 1
        ? html`<div class="text-center mt-5">${nextSectionBtn()}</div>`
        : ''}
    </div>
  `;

  document.querySelector('main').append(content);

  if (func) func();
}

function nextSectionBtn() {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  const nextSection = getNextSection(section);
  if (!nextSection) return '';

  return html`
    <a href="/courses/course?section=${nextSection}" class="btn btn-primary btn-lg" role="button">
      Section suivante
    </a>
  `;
}

function getNextSection(section) {
  const sectionKey = section.split('-')[0];
  const course = sections[sectionKey];
  if (!course) return null;

  const index = course.findIndex((s) => s[0] === section);
  if (index === -1) return null;

  if (index === course.length - 1) return null;

  return course[index + 1][0];
}

export default CoursesSectionPage;
