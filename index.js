'use strict';

const path = require('path');
const pkgDown = require('pkg-down');

const stripDeps = (dir) => {
    const depDirIndex = dir.indexOf('node_modules');
    return depDirIndex >= 0 ?
        dir.substring(0, depDirIndex) :
        dir;
};

// Walk down the filesystem and find the parent directory for the
// topmost Node project.
const codeDir = async (input) => {
    const cwd = path.resolve(input || '');
    const deepest = stripDeps(cwd);

    const filepath = await pkgDown(deepest);
    return filepath && path.join(filepath, '..', '..');
};

module.exports = codeDir;
