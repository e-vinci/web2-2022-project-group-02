import html from '../../../utils/html';
import Navigate from '../../Router/Navigate';

function progressColor(progress) {
  if (progress === 100) return 'success';
  if (progress >= 25) return 'warning';
  return 'danger';
}

function renderProgressBar(progress) {
  return html`
    <div class="progress">
      <div
        class="progress-bar progress-bar-striped bg-${progressColor(progress)}"
        role="progressbar"
        style="width: ${progress}%"
      >
        ${progress}%
      </div>
    </div>
  `;
}

function renderButton(text, link, disabled = false) {
  const btn = html`<a href="#" class="btn btn-primary ${disabled ? 'disabled' : ''}">${text}</a>`;

  if (!disabled)
    if (typeof link === 'string')
      btn.onclick = (e) => {
        e.preventDefault();
        Navigate(link);
      };
    else btn.onclick = link;

  return btn;
}

export { renderButton, renderProgressBar, progressColor };
