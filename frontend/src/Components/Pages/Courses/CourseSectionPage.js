import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import { renderButton } from './util';

import C00 from './CourseSections/c-00-intro';
import ASM00 from './CourseSections/asm-00-intro';
import ASM01 from './CourseSections/asm-01-hardware';
import ASM02 from './CourseSections/asm-02-instructions';

const sections = {
  'c-00-intro': C00,
  'asm-00-intro': ASM00,
  'asm-01-hardware': ASM01,
  'asm-02-instructions': ASM02,
};

const getSection = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  if (!section || !sections[section]) return null;

  return sections[section];
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

      <div class="mt-5 d-flex justify-content-center gap-3 ">
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
    </div>
  `;

  document.querySelector('main').append(content);

  if (func) func();
}

export default CoursesSectionPage;
