import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import { renderButton } from './util';

import C00 from './CourseSections/c-00-intro';
import ASM00 from './CourseSections/asm-00-intro';
import ASM01 from './CourseSections/asm-01-hardware';

const sections = {
  'c-00-intro': C00,
  'asm-00-intro': ASM00,
  'asm-01-hardware': ASM01,
};

const getSection = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  if (!section || !sections[section]) return null;

  return sections[section];
};

let pageNum = 0;

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
  const page = Array.isArray(section[pageNum]) ? section[pageNum][0] : section[pageNum];

  const content = html`
    <div class="container flex-grow-1">
      ${page.cloneNode(true)}

      <div class="row justify-content-center">
        <div class="d-flex justify-content-between">
          ${pageNum > 0
            ? renderButton('Précédent', () => {
                pageNum -= 1;
                CoursesSectionPage();
              })
            : ''}
          ${pageNum < section.length - 1
            ? renderButton('Suivant', () => {
                pageNum += 1;
                CoursesSectionPage();
              })
            : ''}
        </div>
      </div>
    </div>
  `;

  document.querySelector('main').append(content);

  if (Array.isArray(section[pageNum])) {
    section[pageNum][1]();
  }
}

export default CoursesSectionPage;
