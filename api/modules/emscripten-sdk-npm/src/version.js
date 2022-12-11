// emsdk-npm - version.js
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
////////////////////////////////////////////////////////////////////////
//
// Hardcoded Emscripten SDK version to install with this package.
//
// If `version` is `null`, then the allowed version to install is
// unrestricted.

const common = require('./common.js');

const version = null;

function restrictVersionInArgs(args) {
    if (version
        && Array.isArray(args)
        && args.length
        && ['install','activate'].includes(args[0])
    ) {
        // Count number of args that are not -- parameters
        let versionCount = args.filter((val, idx) => {
            // Skip first element
            return (idx && !val.startsWith('-'));
        }).length;

        // If no version is specified, then add our hardcoded version
        if (!versionCount)
            args.push(version);
        // Else, validate all specified versions
        else
            args = args.map((val, idx) => {
                // Skip first element and -- parameters
                if (!idx || val.startsWith('-'))
                    return val;
                // Assume every other arg is a version ("tool")
                else
                    return validateVersion(val);
            });
    }

    return args;
}

function validateVersion(versionInput) {
    if (!version)
        return versionInput;

    if (!versionInput)
        return version;

    // Fastcomp is <=1.40.1 only. We presume <1.0.0 is not installable.
    const canBeFastcomp = version.startsWith('1.');
    
    // Allow `${version}`, 'fastcomp', `${version}-fastcomp`, and any
    // string with version's hash
    if (canBeFastcomp && versionInput === 'fastcomp')
        return `${version}-fastcomp`;
    else if((canBeFastcomp && versionInput === `${version}-fastcomp`)
            || versionInput === version)
        return versionInput;
    else {
        // Validate by version hash
        let hash;
        try {
            let tags = common.getReleaseTags();
            hash = tags.releases[version] || null;
            if (versionInput.includes(hash))
                return versionInput;
        } catch(e) {
            // Fail silently
        }

        throw new RangeError(`
Input version "${versionInput}" is not accepted! Accepted versions are:

    * ${version}
    ${(canBeFastcomp ? `* ${version}-fastcomp (installs legacy backend)
    `: '')}${(hash ? `* Any name with the hash "${hash}"
    ` : '' )}
To install another SDK version, update your "emscripten-sdk" package
to the corresponding version. Or, to access all versions, replace
this package with "emscripten-sdk-npm".
`.trimLeft())
    }
}

module.exports = {
    version: version,
    restrictVersionInArgs: restrictVersionInArgs,
    validateVersion: validateVersion
};
