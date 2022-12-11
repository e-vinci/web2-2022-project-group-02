// emsdk-npm - postinstall.js
// Copyright 2019-2021 Brion Vibber and the emsdk-npm contributors
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
////////////////////////////////////////////////////////////////////////
//
// Install EMSDK during `npm install` if the package is versioned.

const version = require('./version.js').version;

if (!version)
    process.exit(0);

const emsdk = require('./index.js');

try {
    emsdk.checkout()
        .then(() => emsdk.update(true))
        .then(() => emsdk.install(version, true))
        .then(() => emsdk.activate(version))
        .then(() => process.exit(0));
} catch(e) {
    console.warn(`Emscripten SDK install error:

${e}

Allowing NPM installation to finish. The SDK will try to install again
upon first run.
`);

    process.exit(0);
}
