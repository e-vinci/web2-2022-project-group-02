import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';

const ForumPage = () => {
    clearPage();
    renderPageTitle('Forum');
    renderRegisterForm();

  };

  function renderRegisterForm() {
    const main = document.querySelector('main');
  
    const form = html`
      <form class="p-5">
       <section>

        </section>

      </form>
    `;
    main.replaceChildren(form);
  }
  

  export default ForumPage;