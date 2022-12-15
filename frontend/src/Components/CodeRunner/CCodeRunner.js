import html from '../../utils/html';
import CodeEditor from '../CodeEditor/CodeEditor';
import emception from './emception';

function CCodeRunner({ code, tests }) {
  const editorEl = html`<div class="visualiser__code__editor"></div>`;
  const runBtn = html`<button class="btn btn-primary">Exécuter</button>`;

  runBtn.onclick = () => run();

  const visualiser = html`
    <div class="visualiser">
      <div class="visualiser__code">
        ${editorEl}
        <div class="d-flex justify-content-end my-3">${runBtn}</div>
      </div>
      <div class="visualisation">
        <div class="visualiser_error d-none">
          <div
            class="alert alert-danger font-monospace"
            role="alert"
            style="white-space:pre-wrap; font-size: 12px"
          ></div>
        </div>
        <div
          class="visualiser_loader d-flex flex-column gap-3 align-items-center justify-content-center m-5"
        >
          <div class="spinner-border" role="status"></div>
          <p>Préparation de la compilateur...</p>
        </div>
        <div class="test-table"></div>
      </div>
    </div>
  `;

  const editor = new CodeEditor(editorEl, code, 'c');
  editor.getValue();

  let isRunning = false;

  emception.prepare().then(() => {
    if (!isRunning) toggleLoader(false);
  });

  async function run() {
    if (isRunning) return;

    isRunning = true;

    renderError(null);
    toggleLoader(true);
    document.querySelector('.test-table').classList.add('d-none');

    try {
      const codee = await emception.compile(editor.getValue());

      const codeBlob = URL.createObjectURL(
        new Blob([codee], {
          type: 'application/javascript',
        }),
      );

      prepTestTable();
      toggleLoader(false);

      let encounteredError = false;

      tests.forEach((test) => {
        if (encounteredError) return;
        const testCommand = `./code ${test.input.join(' ')}`;

        const row = addTestResult({
          test: testCommand,
          expected: test.output,
          status: 'running',
        });

        let done = false;
        const worker = new Worker(codeBlob);

        setTimeout(() => {
          if (!done) {
            worker.terminate();
            updateTestResult(row, {
              test: testCommand,
              expected: test.output,
              status: 'error',
              got: "[Le programme a pris trop de temps à s'exécuter]",
            });
          }
        }, 5000);

        worker.postMessage({ arguments: test.input });
        worker.onmessage = (e) => {
          done = true;

          if (e.data.error) {
            encounteredError = true;
            renderError(e.data.error);
          } else if (e.data.RETURN !== 0) {
            updateTestResult(row, {
              test: testCommand,
              expected: test.output,
              status: 'error',
              got: "[Le programme n'a pas retourné 0]",
            });
          } else if (e.data.STDOUT !== test.output) {
            updateTestResult(row, {
              test: testCommand,
              expected: test.output,
              status: 'error',
              got: e.data.STDOUT,
            });
          } else {
            updateTestResult(row, {
              test: testCommand,
              expected: test.output,
              status: 'ok',
              got: e.data.STDOUT,
            });
          }
        };
      });
    } catch (e) {
      renderError(e.message);
    } finally {
      isRunning = false;
    }
  }

  function renderError(error) {
    const errorEl = document.querySelector('.visualiser_error');
    const alertEl = errorEl.querySelector('.alert');

    if (!error) {
      errorEl.classList.add('d-none');
      return;
    }

    toggleLoader(false);

    alertEl.innerText = error;
    errorEl.classList.remove('d-none');

    document.querySelector('.test-table').classList.add('d-none');
  }

  function toggleLoader(message) {
    const loader = document.querySelector('.visualiser_loader');

    if (message) {
      loader.classList.remove('d-none');

      loader.querySelector('p').innerText = message === true ? 'Compilation...' : message;
    } else {
      loader.classList.add('d-none');
    }
  }

  function prepTestTable() {
    const table = html`
      <table style="min-width: 100%; font-size: 14px; margin: 0">
        <tr>
          <th>Test</th>
          <th>Attendu</th>
          <th>Obtenu</th>
          <th>&nbsp;</th>
        </tr>
      </table>
    `;

    document.querySelector('.test-table').classList.remove('d-none');
    document.querySelector('.test-table').replaceChildren(table);
  }

  function addTestResult(test) {
    const table = document.querySelector('.test-table table tbody');

    const row = html`<tr class="font-monospace"></tr>`;

    updateTestResult(row, test);

    table.appendChild(row);

    return row;
  }

  function updateTestResult(row, test) {
    let statusCell;
    if (test.status === 'error') statusCell = html`<td class="bg-danger text-white">X</td>`;
    else if (test.status === 'ok') statusCell = html`<td class="bg-success text-white">OK</td>`;
    else
      statusCell = html`<td class="bg-info text-white">
        <div class="spinner-border" style="width:1em;height:1em"></div>
      </td>`;

    row.replaceChildren(
      html`
        <td>${test.test}</td>
        <td>${test.expected}</td>
        <td>
          ${test.got ?? html`<div class="spinner-border" style="width:1em;height:1em"></div>`}
        </td>
        ${statusCell}
      `,
    );

    return row;
  }

  return visualiser;
}

export default CCodeRunner;
