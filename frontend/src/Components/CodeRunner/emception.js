import * as Comlink from 'comlink';

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
    this.loadAttempts = 0;
  }

  prepare() {
    if (this.isPrepared) return this.isPrepared;

    this.isPrepared = (async () => {
      while (this.loadAttempts < 3) {
        try {
          this.loadAttempts += 1;

          const worker = new Worker(
            `${process.env.PATH_PREFIX}emception/emception.worker.bundle.worker.js`,
          );
          const emception = Comlink.wrap(worker);

          // emception.onstdout = Comlink.proxy((str) => console.log(str));

          this.emception = emception;
          this.Comlink = Comlink;

          // This rule is a false positive
          // eslint-disable-next-line no-await-in-loop
          return await emception.init();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
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
export default em;
