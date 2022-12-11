// emsdk-npm - common.js 
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

const path = require('path');
const fs = require('fs');
const GetEmsdkPath = require('./path.js').getEmsdkPath;
const spawn = require('cross-spawn-promise');

function moduleBase() {
    // Top-level dir for this module
    const srcdir = path.dirname(module.filename);
    const basedir = path.dirname(srcdir);
    return basedir;
}

function emsdkBase() {
    // Do sanity checks on the location and prints warning messages
    let testPath = GetEmsdkPath();
    
    return testPath;
}

function run(command, args, opts = {}) {
    return spawn(
        command,
        args,
        {
            stdio: [
                'inherit',
                'inherit',
                'inherit'
            ],
            ...opts
        }
    );
}

////////////////////////////////////////////////////////////////////////
// install() helpers
// Retrieve release tags and detect whether our requested version
// is already active as indicated by `.emsdk_version`
////////////////////////////////////////////////////////////////////////

function getReleaseTags() {
    let tagsFile = path.join(emsdkBase(), 'emscripten-releases-tags.json');
    let rawData = fs.readFileSync(tagsFile);
    return JSON.parse(rawData);
}

function getTotHash() {
    let totFile = path.join(emsdkBase(), 'emscripten-releases-tot.txt');
    return fs.readFileSync(totFile);
}

function getInstalled(version) {
    // Set lookup defaults in case of exception
    let which = (version.includes('fastcomp')) ? 'fastcomp' : 'upstream';
    let hash = version;
    let versionData = '';

    try {
        // Get hash from version
        // Version hash is the same regardless if -fastcomp is in the string
        if (version.includes('tot'))
            hash = getTotHash();
        else {
            let tags = getReleaseTags();
            
            if (version.includes('latest'))
                hash = tags.releases[tags.latest];
            else {
                let versionTest = version.replace('-fastcomp', '');
                if (versionTest in tags.releases)
                    hash = tags.releases[versionTest];
                // else, user may have passed a complete hash string already
            }
        }
        
        // Get currently installed hash
        let versionFile = path.join(emsdkBase(), which, '.emsdk_version');
        versionData = fs.readFileSync(versionFile);
    } catch (e) {
        console.warn('Error retrieving installed EMSDK version: ' + e.message);
    }

    return versionData.includes(hash);
}

module.exports = {
    moduleBase: moduleBase,
    emsdkBase: emsdkBase,
    run: run,
    getReleaseTags: getReleaseTags,
    getTotHash: getTotHash,
    getInstalled: getInstalled
};
