// emsdk-npm - path.js 
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

const config = require('@zkochan/npm-conf')();
const path = require('path');
const fs = require('fs');

let forcedPath = null;

function _CheckNonEmptyPath(testPath) {
    // Sanity check: If user specified a non-empty directory that's
    // NOT emsdk, then fail.
    let emsdkFilePath = path.join(testPath, 'emsdk.py');

    if (fs.existsSync(testPath)
        && !fs.existsSync(emsdkFilePath)
    ) {
        console.warn(`
WARNING: Your configured path is not empty! Specify an empty path.

    ${testPath}
`.trimLeft());

        throw new RangeError(`Emscripten SDK install path is not empty.`);
    }
}

function _CheckLengthOfPath(testPath) {
    // Sanity check: If Windows, check if path exceeds 85 chars, or else EMSDK installation
    // will fail due to MAX_PATH limitation.
    // See https://github.com/devappd/emscripten-build-npm/issues/6
    const MAX_BASE_PATH = 85;

    if (process.platform === 'win32') {
        if (testPath.length > MAX_BASE_PATH) {
            console.warn(`
WARNING: This path exceeds ${MAX_BASE_PATH} characters, meaning that
Emscripten SDK installation might fail.

    ${testPath}

If install falls, enable long paths in Windows and try again: https://www.howtogeek.com/266621/how-to-make-windows-10-accept-file-paths-over-260-characters/
`.trimLeft());

            // throw new RangeError(`Emscripten SDK install path exceeds ${MAX_BASE_PATH} characters.`);
        }
    }
}

function GetEmsdkPath() {
    // Retrieve the path from NPM config (cmd argument or .npmrc) or default to node_modules.
    let configPath = forcedPath || config.get('emsdk');

    // Presumes <module>/src
    let modulePath = path.resolve(path.join(path.dirname(module.filename), '..', 'emsdk'));
    let testPath = (configPath ? path.resolve(configPath) : modulePath);

    // Throws exception if failed
    _CheckNonEmptyPath(testPath);
    _CheckLengthOfPath(testPath);

    // We're installable
    return testPath;
}

function SetEmsdkPath(input) {
    forcedPath = input;
}

module.exports = {
    getEmsdkPath: GetEmsdkPath,
    setEmsdkPath: SetEmsdkPath
};
