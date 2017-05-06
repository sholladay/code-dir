import fs from 'fs';
import path from 'path';
import test from 'ava';
import mkdirtemp from 'mkdirtemp';
import codeDir from '.';

const writeFile = (...args) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(...args, 'utf8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

test('returns null if not found', async (t) => {
    const cwd = await mkdirtemp();
    const dirPath = await codeDir(cwd);
    t.is(dirPath, null);
});

test('returns parents of cwd if it contains package.json', async (t) => {
    const cwd = await mkdirtemp();
    writeFile(path.resolve(cwd, 'package.json'), '');
    const dirPath = await codeDir(cwd);
    t.is(dirPath, path.dirname(cwd));
});
