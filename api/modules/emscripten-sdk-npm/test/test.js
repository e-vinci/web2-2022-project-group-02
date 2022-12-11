// emsdk-npm - test.js
// Copyright 2019-2020 Brion Vibber and the emsdk-npm contributors
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const emsdk = require('../src/index.js');

describe('emsdk-npm JavaScript API', function() {
  const installPath = path.join(process.cwd(), 'test', 'emsdk-test');
  const buildPath = path.join(__dirname, 'example-build');

  // Five minutes to allow installing everything
  this.timeout(300000);

  before(function() {
    if (fs.existsSync(installPath))
      fs.rmdirSync(installPath, { recursive: true });
    
    [path.join(buildPath, 'main.js'), path.join(buildPath, 'main.wasm')]
      .forEach(function (buildFile) {
        if (fs.existsSync(buildFile))
          fs.unlinkSync(buildFile);
      });

    emsdk.setEmsdkPath(installPath);
  });

  describe('checkout()', function() {
    it('should write emsdk.py to the install dir', async function() {
      await emsdk.checkout();

      const testPath = path.join(installPath, 'emsdk.py');
      assert(fs.existsSync(testPath));
    })
  });

  describe('update()', function() {
    it('should write emscripten-releases-tot.txt to the install dir', async function() {
      await emsdk.update();

      if (!emsdk.version) {
        const testPath = path.join(installPath, 'emscripten-releases-tot.txt');
        assert(fs.existsSync(testPath));
      } else {
        console.log('Running in versioned mode, no update() changes occurred.');
      }
    })
  });

  describe('install()', function() {
    it('should write the correct version to upstream/.emsdk_version', async function() {
      await emsdk.install();

      // Get the version store
      const tagsFile = path.join(installPath, 'emscripten-releases-tags.txt');
      const tagsRaw = fs.readFileSync(tagsFile);
      const tags = JSON.parse(tagsRaw);

      // Get the correct hash
      const testVersion = emsdk.version || 'latest';
      if (testVersion.includes('latest'))
        hash = tags.releases[tags.latest];
      else
        hash = tags.releases[testVersion];

      // Test the indicator file
      const versionFile = path.join(installPath, 'upstream', '.emsdk_version');
      versionData = fs.readFileSync(versionFile);
      assert(versionData.includes(hash));
    });
  });

  describe('activate()', function() {
    it('should write .emscripten to the install dir', async function() {
      await emsdk.activate();

      const testPath = path.join(installPath, '.emscripten');
      assert(fs.existsSync(testPath));
    });
  });

  describe('run()', function() {
    it('should build an example program and output to test/example-build/main.js', async function() {
      await emsdk.run(
        'em++',
        ['-o', 'main.js', 'main.cpp'],
        { cwd: buildPath }
      );

      const testPath = path.join(buildPath, 'main.js');
      assert(fs.existsSync(testPath));
    })
  });

  describe('remove()', function() {
    it('should remove the entire install directory', async function() {
      await emsdk.remove();

      const testPath = installPath;
      assert(!fs.existsSync(testPath));
    })
  });

  after(function() {
    [path.join(buildPath, 'main.js'), path.join(buildPath, 'main.wasm')]
      .forEach(function (buildFile) {
        if (fs.existsSync(buildFile))
          fs.unlinkSync(buildFile);
      });

    if (fs.existsSync(installPath))
      fs.rmdirSync(installPath, { recursive: true });
  });
});
