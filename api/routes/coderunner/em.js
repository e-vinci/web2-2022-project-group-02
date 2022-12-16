import * as Comlink from 'comlink';
import { Worker } from 'node:worker_threads';
import nodeEndpoint from 'comlink/dist/esm/node-adapter.mjs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const flags = [
  '-O2',
  '-fexceptions',
  '--memory-init-file 0',
  '-s',
  'ENVIRONMENT=worker',
  '-s',
  'EXPORTED_FUNCTIONS=["_main"]',
  '-s',
  'MODULARIZE=0',
  '-s',
  'EXPORT_ES6=0',
  '-s',
  'FORCE_FILESYSTEM=1', // for stdout
  '-s',
  'INVOKE_RUN=0',
  '-s',
  'EXIT_RUNTIME=1',
].join(' ');

const preJS = `
  var stdoutBuffer = "";
  var stderrBuffer = "";
  var input = "";

  var stdinI = 0;

  var Module = {
    arguments: [],
    preRun: [
      function () {
        // handle stdout and stderr
        function stdin() {
          if (stdinI < input.length) {
            var code = input.charCodeAt(stdinI);
            ++stdinI;
            return code;
          } else {
            return null;
          }
        }

        function stdout(code) {
          stdoutBuffer += String.fromCharCode(code);
        }

        function stderr(code) {
          stderrBuffer += String.fromCharCode(code);
        }
        
        FS.init(stdin, stdout, stderr);
      },
    ],
    postRun: [],
    noInitialRun: true,
    onRuntimeInitialized: () => {
      isInitialized = true;
    }
  };

  let isInitialized = false;

  onmessage = function (e) {
    var data = e.data ?? {};

    if (data.input) {
      input = data.input;
    }
  
    Module.arguments = [...Module.arguments, ...(data.arguments ?? [])];

    const timer = setInterval(() => {
      if (isInitialized) {
        clearInterval(timer);
        const ret = callMain(Module.arguments);

        postMessage({
          STDOUT: stdoutBuffer,
          STDERR: stderrBuffer,
          RETURN: ret,
        });
      }
    }, 10);
  };
  window = {};
`;

class EM {
  constructor() {
    this.isPrepared = false;
  }

  prepare() {
    if (this.isPrepared) return this.isPrepared;

    this.isPrepared = (async () => {
      try {
        const worker = new Worker(path.join(__dirname, `/emception/emception.worker.js`));
        const emception = Comlink.wrap(nodeEndpoint(worker));

        this.emception = emception;
        this.Comlink = Comlink;

        const onprocessstart = () => {};
        const onprocessend = () => {};
        emception.onprocessstart = Comlink.proxy(onprocessstart);
        emception.onprocessend = Comlink.proxy(onprocessend);

        return await emception.init();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      throw new Error('Failed to load emcc');
    })();

    return this.isPrepared;
  }

  async compile(code) {
    await this.prepare();

    let stderr = '';
    this.emception.onstderr = Comlink.proxy((str) => {
      if (str.startsWith('emcc:')) return;
      stderr += `${str}\n`;
    });

    await this.emception.fileSystem.writeFile('/working/main.c', code);
    const cmd = `emcc ${flags} -s SINGLE_FILE=1 main.c -o main.js`;
    const result = await this.emception.run(cmd);

    if (result.returncode === 0) {
      const content = await this.emception.fileSystem.readFile('/working/main.js', {
        encoding: 'utf8',
      });
      return preJS + content;
    }

    throw new Error(stderr);
  }
}

const em = new EM();
em.prepare().catch(console.error);
export default em;
