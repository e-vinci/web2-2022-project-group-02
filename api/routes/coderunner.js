const fs = require('node:fs/promises');
const path = require('node:path');
const express = require('express');
const emsdk = require('emscripten-sdk-npm');
const tmp = require('tmp-promise');

const router = express.Router();

const EMPrep = (async () =>
  emsdk
    .checkout()
    .then(() => emsdk.install('3.1.28'))
    .then(() => emsdk.activate('3.1.28'))
    .then(() => {})
    .catch((err) => {
      throw new Error(err);
    }))();

const preJS = `var stdoutBuffer = "";
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
  // print: () => {},
  // printErr: () => {},
  noInitialRun: true,
};

onmessage = function (e) {
  var data = e.data;

  if (data.input) {
    input = data.input;
  }

  Module.arguments = [...Module.arguments, ...(data.arguments ?? [])];

  const ret = callMain(data.arguments ?? []);

  postMessage({
    STDOUT: stdoutBuffer,
    STDERR: stderrBuffer,
    RETURN: ret,
  });
};`;

router.post('/', async (req, res) => {
  if (typeof req.body.code !== 'string') {
    res.status(400).json({ error: 'code is not a string' });
    return;
  }

  await EMPrep;
  const tmpFolder = await tmp.dir({ unsafeCleanup: true });

  try {
    fs.writeFile(path.join(tmpFolder.path, 'code.c'), req.body.code);
    fs.writeFile(path.join(tmpFolder.path, 'pre.js'), preJS);
    await emsdk.run(
      'emcc',
      [
        '-o',
        path.join(tmpFolder.path, 'code.js'),
        '--pre-js',
        path.join(tmpFolder.path, 'pre.js'),
        '-Oz',
        '-sWASM=0',
        '--memory-init-file 0',
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
        path.join(tmpFolder.path, 'code.c'),
      ],
      {
        stdio: 'pipe',
        env: {
          ...process.env,
          EMSDK_QUIET: '1',
          EMSDK_VERBOSE: '0',
        },
      },
    );

    const wasm = await fs.readFile(path.join(tmpFolder.path, 'code.js'));

    res.contentType('text/javascript');
    res.send(wasm);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    let errorString = err.stderr ? err.stderr.toString() : "Une erreur interne s'est produite";
    // Hide the temporary file paths
    errorString = errorString.replaceAll(`${path.join(tmpFolder.path, 'code.c')}:`, '');
    errorString = errorString.replaceAll(path.join(tmpFolder.path, 'code.c'), '');
    errorString = errorString.replaceAll(/^emcc:.*$/gm, '');
    errorString = errorString.replaceAll(/^.+\/emscripten\/.+\/(?=.+\.h)/gm, '');

    res.contentType('text/javascript');
    res.send(`
      postMessage({
        error: ${JSON.stringify(errorString.trim())},
      });
    `);
  } finally {
    tmpFolder.cleanup().catch(() => {});
  }
});

module.exports = router;
