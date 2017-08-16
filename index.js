'use strict';

const path = require('path');
const findDown = require('find-down');
const childrenDirs = require('children-dirs');
const locatePath = require('locate-path');

const stripDeps = (dir) => {
    const depDirIndex = dir.indexOf('node_modules');
    return depDirIndex >= 0 ?
        dir.substring(0, depDirIndex) :
        dir;
};

// Walk down the filesystem and find the parent directory for the
// topmost Node project.
const codeDir = async (input) => {
    const cwd = stripDeps(path.resolve(input || ''));
    const projectFiles = ['.git', 'package.json'];

    const filepath = await findDown(projectFiles, { cwd });
    if (filepath) {
        return path.join(filepath, '..', '..');
    }

    const children = await childrenDirs(cwd);
    const pathsToCheck = children.reduce((result, child) => {
        result.push(...projectFiles.map((filename) => {
            return path.join(child, filename);
        }));
        return result;
    }, []);
    const fp = await locatePath(pathsToCheck, {
        cwd,
        preserveOrder : false
    });

    return fp ? cwd : null;
};

module.exports = codeDir;
