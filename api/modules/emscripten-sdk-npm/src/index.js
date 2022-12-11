// emsdk-npm - index.js
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

const emsdk = require('./emsdk.js');
const emsdkCheckout = require('./emsdk-checkout.js');
const emsdkRun = require('./emsdk-run.js');
const emsdkPull = require('./emsdk-pull.js');
const common = require('./common.js');
const pathTools = require('./path.js');
const fs = require('fs');
const path = require('path');

// This property restricts the version to be installed.
// If hardVersion is null, then the installable version is unrestricted.
const versionTools = require('./version.js');
const hardVersion = versionTools.version;
const defaultVersion = (hardVersion || 'latest');

////////////////////////////////////////////////////////////////////////
// JS API
////////////////////////////////////////////////////////////////////////

function remove() {
    let emsdkPath = common.emsdkBase();
    let emsdkFilePath = path.join(emsdkPath, 'emsdk.py');

    // Only clear directory if we verify the directory is an EMSDK
    // installation. Skip if the dir exists, but it's empty.
    if (fs.existsSync(emsdkPath)) {
        if (fs.existsSync(emsdkFilePath))
            fs.rmdirSync(emsdkPath, { recursive: true });
        else if (fs.readdirSync(emsdkPath).length > 0)
            throw new RangeError(`${emsdkPath} is not an EMSDK installation! ("emsdk.py" was not found.)`);
    }

    return Promise.resolve();
}

function checkout(force = false) {
    let emsdkPath = common.emsdkBase();
    let emsdkFilePath = path.join(emsdkPath, 'emsdk.py');

    if (fs.existsSync(emsdkPath)) {
        if (fs.existsSync(emsdkFilePath)) {
            if (force)
                remove();
            else
                return Promise.resolve();
        } else if (fs.readdirSync(emsdkPath).length > 0)
            throw new RangeError(`${emsdkPath} is non-empty! Specify an empty path or an existing EMSDK installation.`);
    }

    return emsdkCheckout.run();
}

function update(force = false) {
    let emsdkPath = common.emsdkBase();
    let emsdkFilePath = path.join(emsdkPath, 'emsdk.py');

    // No need to refresh the repo if the package is versioned. The
    // postinstall script takes care of this.
    if (!force && hardVersion
        // Verify that the EMSDK installation is active
        && fs.existsSync(emsdkFilePath))
        return Promise.resolve();

    // Because we clone from git, we need to `git pull` to update
    // the tag list in `emscripten-releases-tags.txt`
    return emsdkPull.run().then(function () {
        // `emsdk update-tags` updates `emscripten-release-tot.txt`
        return emsdk.run([
            'update-tags'
        ]);
    })
}

function install(version = defaultVersion, force = false) {
    version = versionTools.validateVersion(version);

    // Check if requested EMSDK version is installed.
    // Only one version can be installed at a time, and no other
    // versions are cached.
    if (!force && common.getInstalled(version))
        return Promise.resolve();

    return emsdk.run([
        'install',
        version
    ]);
}

function activate(version = defaultVersion) {
    version = versionTools.validateVersion(version);

    if (!common.getInstalled(version))
        throw new Error('Emscripten SDK version ${version} is not installed! Cannot activate.');

    return emsdk.run([
        'activate',
        version
    ]);
}

function run(command, args, opts = {}) {
    return emsdkRun.run(command, args, opts);
}

module.exports = {
    remove: remove,
    checkout: checkout,
    update: update,
    install: install,
    activate: activate,
    run: run,
    getEmsdkPath: pathTools.getEmsdkPath,
    setEmsdkPath: pathTools.setEmsdkPath,
    getInstalled: common.getInstalled,
    validateVersion: versionTools.validateVersion,
    version: versionTools.version
};
