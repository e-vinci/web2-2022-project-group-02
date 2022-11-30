import { clearPage, renderPageTitle } from '../../utils/render';

const CoursesPage = () => {
  clearPage();
  renderPageTitle('Leçons');
  renderCourses();
};

function renderCourses() {
  const main = document.querySelector('main');

  const html = `
  <div class="container text-center">
    <h3>Suggestion des cours</h3>
    <div class="row justify-content-center g-4">
      <div class="col-12 col-md-4">
        <a class="btn btn-primary p-4" href="#" data-uri="/Cfacile">Commencer leçon<br />Langage C</a>
      </div>
      <div class="col-12 col-md-4">
        <a class="btn btn-primary p-4" href="#" data-uri="/asm">Commencer leçon<br />ASM</a>
      </div>
    </div>
  </div>`;
  main.replaceChildren(html);
}

export default CoursesPage;
