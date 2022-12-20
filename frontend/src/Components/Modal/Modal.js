import { Modal as BootstrapModal } from 'bootstrap';
import html from '../../utils/html';

/**
 * Create a modal.
 * @param {Object} info
 * @param {string} info.title - Modal title
 * @param {string} info.body - Modal body
 * @param {string} info.footer - Modal footer
 * @param {boolean?} info.isStatic - If true, the modal will not close when clicking outside of it
 * @param {boolean?} info.closeBtn - If true, a close button will be added to the modal
 * @param {boolean?} info.wrapInForm - If true, the modal will be wrapped in a form
 * @returns {[HTMLElement, BootstrapModal]}
 * @example
 * const [modalEl, modal] = Modal({
 *  title: 'Modal title',
 *  body: 'Modal body',
 *  footer: 'Modal footer',
 *  isStatic: true,
 *  closeBtn: true,
 *  wrapInForm: false,
 * });
 */
export default function Modal(info) {
  const title = info.title || '';
  const body = info.body || '';
  const footer = info.footer || '';
  const isStatic = info.isStatic || false;
  const closeBtn = info.closeBtn || true;
  const wrapInForm = info.wrapInForm || false;

  const bodyAndFooter = document.createElement(wrapInForm ? 'form' : 'div');
  bodyAndFooter.replaceChildren(html`
    <div class="modal-body">${body}</div>
    <div class="modal-footer">
      ${closeBtn
        ? html`
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          `
        : ''}
      ${footer}
    </div>
  `);

  const el = html`
    <div
      class="modal fade"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      data-bs-backdrop="${isStatic ? 'static' : 'true'}"
      data-bs-keyboard="${isStatic ? 'false' : 'true'}"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">${title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fermer"
            ></button>
          </div>
          ${bodyAndFooter}
        </div>
      </div>
    </div>
  `;

  const modal = new BootstrapModal(el, {});

  modal.show();

  el.addEventListener('hidden.bs.modal', () => {
    el.remove();
  });

  return [el, modal];
}
