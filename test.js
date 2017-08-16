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

test('returns parent of cwd if it contains package.json', async (t) => {
    const cwd = await mkdirtemp();
    await writeFile(path.resolve(cwd, 'package.json'), '');
    const dirPath = await codeDir(cwd);
    t.is(dirPath, path.dirname(cwd));
});

test('returns parent of cwd if it is a repository', async (t) => {
    const cwd = await mkdirtemp();
    await writeFile(path.resolve(cwd, '.git'), '');
    const dirPath = await codeDir(cwd);
    t.is(dirPath, path.dirname(cwd));
});

test('returns cwd if it has a child that contains package.json', async (t) => {
    const cwd = await mkdirtemp();
    const child = await mkdirtemp(cwd);
    await writeFile(path.resolve(child, 'package.json'), '');
    const dirPath = await codeDir(cwd);
    t.is(dirPath, cwd);
});
