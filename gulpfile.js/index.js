const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const prettier = require('gulp-prettier');

const options = {};
const argvs = process.argv.slice(3);

for (let index = 0; index < argvs.length; index++) {
  if (!argvs[index].startsWith('-')) continue;
  const key = argvs[index].substring(1);
  if (!argvs[index + 1] || argvs[index + 1].startsWith('-')) {
    options[key] = true;
  } else {
    options[key] = argvs[index + 1];
    index++;
  }
}

if (typeof options.module !== 'string') throw new Error('Module name not specified!');

const lcText = options.module;
const ucText = lcText.split('-').map(function capitalize(part) {
  return part.charAt(0).toUpperCase() + part.slice(1);
}).join('');
const lcfucText = ucText.charAt(0).toLowerCase() + ucText.slice(1);

gulp.task('generate', function () {
  if (!!options.mongo)
    return gulp.src('gulpfile.js/modules/product/**/*')
      .pipe(rename(function (path) {
        path.basename = path.basename.replace('product', options.module);
      }))
      .pipe(replace('productService', `${lcfucText}Service`))
      .pipe(replace('product', lcText))
      .pipe(replace('Product', ucText))
      .pipe(prettier())
      .pipe(gulp.dest(`./src/modules/${lcText}/`));
  else
    return gulp.src('gulpfile.js/modules/good/**/*')
      .pipe(rename(function (path) {
        path.basename = path.basename.replace('good', options.module);
      }))
      .pipe(replace('goodService', `${lcfucText}Service`))
      .pipe(replace('good', lcText))
      .pipe(replace('Good', ucText))
      .pipe(prettier())
      .pipe(gulp.dest(`./src/modules/${lcText}/`));
});