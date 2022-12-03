import html from '../../../utils/html';

function CodeDemo(code, demo) {
  const el = html`<div class="code-demo">
    <div class="code">${code}</div>
    <div class="demo">${demo.cloneNode(true)}</div>
  </div>`;

  return el;
}

export default CodeDemo;
