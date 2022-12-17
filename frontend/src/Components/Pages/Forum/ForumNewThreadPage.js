import EasyMDE from 'easymde';
import { clearPage, renderPageTitle } from '../../../utils/render';
import API from '../../../utils/api';
import html from '../../../utils/html';
import { isAuthenticated } from '../../../utils/auths';
import Navigate from '../../Router/Navigate';

const ForumNewThreadPage = () => {
  if (!isAuthenticated()) {
    Navigate('/login');
    return;
  }

  clearPage();
  renderPageTitle('Forum - Poser une question');
  render();
};

function render() {
  const form = html`
    <form id="question-form" class="container">
      <div class="mb-3">
        <label for="input-title" class="form-label">Titre de la question</label>
        <input type="text" class="form-control" id="input-title" />
        <div class="form-text">Choisissez un titre qui résume votre question</div>
      </div>
      <div class="mb-3">
        <label for="input-content" class="form-label">Contenu de la question</label>
        <textarea class="form-control" id="input-content" rows="3"></textarea>
      </div>
      <div class="mb-3 d-flex gap-3 justify-content-end">
        <div class="spinner-border d-none" role="status"></div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </div>
    </form>
  `;

  const easyMDE = new EasyMDE({
    element: form.querySelector('textarea'),
    spellChecker: false,
    toolbar: [
      'bold',
      'italic',
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      '|',
      'guide',
    ],
  });

  form.onsubmit = async (ev) => {
    ev.preventDefault();

    if (!form.querySelector('.spinner-border').classList.contains('d-none')) return;

    form.querySelector('.alert')?.remove();
    form.querySelector('.spinner-border').classList.remove('d-none');

    const content = easyMDE.value().trim();

    try {
      if (content.length < 3) {
        form.append(html`<div class="alert alert-danger my-3">Votre message est trop court</div>`);
        return;
      }

      const { id } = await API.POST(`/forum/`, {
        title: form.querySelector('#input-title').value,
        content,
      });

      Navigate(`/forum/thread?id=${id}`);
    } catch (err) {
      form.append(html`<div class="alert alert-danger my-3">
        Une erreur est survenue: ${err.message}
      </div>`);
    } finally {
      form.querySelector('.spinner-border').classList.add('d-none');
    }
  };

  const main = document.querySelector('main');
  main.appendChild(form);
}

export default ForumNewThreadPage;
