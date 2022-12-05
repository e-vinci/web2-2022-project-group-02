import anime from 'animejs';

import html from '../../utils/html';
import Editor from './Editor';

import { Runtime } from './ASM/emulation/runtime.ts';
import { Assembler, AssemblyException } from './ASM/assembly/assembler.ts';
import { CPU } from './ASM/emulation/cpu.ts';
import { MemoryBlock } from './ASM/emulation/memory-block.ts';
import { Process } from './ASM/emulation/process.ts';

const registers = [
  ['EAX', true],
  ['EBX', true],
  ['ECX', true],
  ['EDX', true],
  ['ESI', false],
  ['EDI', false],
];

function registerEl() {
  return registers.map(
    (register) => html`
      <div class="register" id="register-${register[0]}">
        <div class="register__label">${register[0]}</div>
        <div class="register__cells">
          <div class="register__cell">
            <div class="register__cell-value">00</div>
          </div>
          <div class="register__cell">
            <div class="register__cell-value">00</div>
          </div>
          <div class="register__cell">
            ${register[1]
              ? html`
                  <div class="register__cell__indicator--sixteen-bit">${register[0].slice(1)}</div>
                `
              : ''}
            <div class="register__cell__value">00</div>
            ${register[1]
              ? html`
                  <div class="register__cell__indicator--eight-bit">
                    ${`${register[0].slice(1, 2)}H`}
                  </div>
                `
              : ''}
          </div>
          <div class="register__cell">
            <div class="register__cell__value">00</div>

            ${register[1]
              ? html`
                  <div class="register__cell__indicator--eight-bit">
                    ${`${register[0].slice(1, 2)}L`}
                  </div>
                `
              : ''}
          </div>
        </div>
      </div>
    `,
  );
}

function ASMVisualiser(code) {
  const editorEl = html`<div class="visualiser__code__editor"></div>`;
  const runBtn = html`<button class="btn btn-primary">Exécuter</button>`;

  runBtn.onclick = () => run();

  const visualiser = html`
    <div class="visualiser">
      <div class="visualiser__code">
        ${editorEl}
        <div class="d-flex justify-content-end my-3">${runBtn}</div>
        <div class="visualiser__code__error d-none">
          <div class="alert alert-danger" role="alert"></div>
        </div>
      </div>
      <div class="visualisation">
        <div class="registers">${registerEl()}</div>
      </div>
    </div>
  `;

  const editor = new Editor(editorEl, code);
  editor.getValue();

  function run() {
    renderError(null);
    document.querySelector('.registers').replaceChildren(...registerEl());

    const runtime = new Runtime();
    const assembler = new Assembler();
    let cpu;

    try {
      const program = assembler.assemble(editor.getValue());
      const memory = new MemoryBlock(256);

      cpu = new CPU(program, memory);
      // TODO
      // cpu.onInterrupt.subscribe(handleInterrupt);
      // TODO
      // cpu.onError.subscribe((runtimeException) =>
      // 	alert(runtimeException.message)
      // );

      cpu.onRegisterChange.subscribe(([register, mem]) => {
        editor.highlightLine(cpu.activeLine + 1);
        updateRegister(register, mem.getValue().toString(16));
      });

      runtime.process = new Process(cpu);

      runtime.process.start();
    } catch (e) {
      if (e instanceof AssemblyException) {
        renderError(`Erreur à la ligne ${e.line}: ${e.message}`);
      } else {
        throw e;
      }
    }
  }

  return visualiser;
}

function renderError(error) {
  const errorEl = document.querySelector('.visualiser__code__error');
  const alertEl = errorEl.querySelector('.alert');

  if (!error) {
    errorEl.classList.add('d-none');
    return;
  }

  alertEl.innerHTML = error;
  errorEl.classList.remove('d-none');
}

/**
 * Returns top and left coordinates for overlaying an element
 * @param {HTMLElement} element
 * @param {HTMLElement} overlay
 * @returns {Object} {top, left}
 */
function getOverlayCoordinates(element, overlay) {
  const { top, left, width, height } = element.getBoundingClientRect();
  const { width: overlayWidth, height: overlayHeight } = overlay.getBoundingClientRect();
  const { scrollTop, scrollLeft } = document.documentElement;

  return {
    top: top + height / 2 - overlayHeight / 2 + scrollTop,
    left: left + width / 2 - overlayWidth / 2 + scrollLeft,
  };
}

/**
 * Updates a cell in the preview
 * @param {string} row Row name
 * @param {number} column Column number
 * @param {string} content New content
 * @param {Element?} source Element to originate the animation from
 * @returns Promise that resolves when the animation is done
 */
async function updateCell(row, column, content, source_ = null) {
  const element = document.querySelector(
    `#register-${row} .register__cell:nth-child(${column + 1}) .register__cell__value`,
  );
  const magic = document.createElement('div');
  magic.className = 'magic';
  magic.innerHTML = content;

  if (!element) return;

  const source = source_ ?? element;
  const { top, left } = getOverlayCoordinates(source, magic);
  magic.style.top = `${top}px`;
  magic.style.left = `${left}px`;

  document.querySelector('.visualisation').appendChild(magic);

  anime({
    targets: magic,
    duration: 400,
    easing: 'linear',
    ...getOverlayCoordinates(element, magic),
  }).finished.then(async () => {
    element.innerHTML = content;
    element.style.fill = '#fd9f68';

    await anime({
      targets: magic,
      duration: 400,
      opacity: 0,
      easing: 'linear',
    }).finished;

    magic.parentNode.removeChild(magic);
  });
}

/**
 * Updates a register in the preview
 * @param {string} register Register name
 * @param {string} value New value
 */
async function updateRegister(register_, value_) {
  const animations = [];

  // console.log(register, value);

  // if value is uneven
  const value = value_.length % 2 !== 0 ? `0${value_}` : value_;
  const parts = value.match(/.{2}/g).reverse();

  const register = register_.length === 2 ? `E${register_.substring(0, 1)}X` : register_;
  let i = 3;
  if (register.endsWith('H')) i = 2;

  parts.forEach((part) => {
    animations.push(updateCell(register.toUpperCase(), i, part));
    i -= 1;
  });

  await Promise.all(animations);
}

export default ASMVisualiser;
