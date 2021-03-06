# code-dir [![Build status for code-dir on Circle CI.](https://img.shields.io/circleci/project/sholladay/code-dir/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/code-dir "Code Dir Builds")

> Find the parent directory for top level projects.

## Why?

 - Simple downward search algorithm.
 - Useful for operating on multiple projects.
 - The end user likely visits here a lot.

## Install

```sh
npm install code-dir --save
```

## Usage

Get it into your program.

```js
const codeDir = require('code-dir');
```

Find the directory where the end user stores their projects.

```js
codeDir().then((dirPath) => {
    console.log(dirPath);  // => '/Users/sholladay/Code/personal'
});
```

## API

### codeDir(cwd)

Returns a `Promise` for the path of the topmost project's parent directory. A project is a directory that contains either `.git` or `package.json`.

#### cwd

Type: `string`<br>
Default: `process.cwd()`

Current working directory the search is based on. This is the deepest directory that could be returned. If neither it nor any of its parent directories are projects, then as a last resort, its children are checked to determine if any of them are projects, in case the working directory itself is the code directory, since that is a common case.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/code-dir/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/code-dir/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/code-dir/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/code-dir/blob/master/LICENSE "The license for code-dir.") © [Seth Holladay](http://seth-holladay.com "Author of code-dir.")

Go make something, dang it.
