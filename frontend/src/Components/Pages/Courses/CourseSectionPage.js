import { clearPage } from '../../../utils/render';
import html from '../../../utils/html';
import { renderButton } from './util';

import C00 from './CourseSections/c-00-intro';

const sections = {
  'c-00-intro': C00,
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
  const page = section[pageNum];

  const content = html`
    <div class="container">
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
}

export default CoursesSectionPage;