const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const append = require("gulp-append");
const insert = require("gulp-insert");
const prettier = require("gulp-prettier");

const options = {};
const argvs = process.argv.slice(3);

for (let index = 0; index < argvs.length; index++) {
  if (!argvs[index].startsWith("-")) continue;
  const key = argvs[index].substring(1);
  if (!argvs[index + 1] || argvs[index + 1].startsWith("-")) {
    options[key] = true;
  } else {
    options[key] = argvs[index + 1];
    index++;
  }
}

if (typeof options.module !== "string")
  throw new Error("Module name not specified!");

const lcText = options.module;
const ucText = lcText
  .split("-")
  .map(function capitalize(part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  })
  .join("");
const lcfucText = ucText.charAt(0).toLowerCase() + ucText.slice(1);

gulp.task("new", function () {
  if (!!options.mongo) {
    const imprt = `import ${lcText}Router from "./route/${lcText}.route";`;
    const route = `routes.use("/${lcText}",passport.authenticate("jwt", { session: false }),${lcText}Router);`;
    return (
      gulp
        .src("gulpfile.js/modules/product/**/*")
        .pipe(
          rename(function (path) {
            path.basename = path.basename.replace("product", options.module);
          })
        )
        .pipe(replace("productService", `${lcfucText}Service`))
        .pipe(replace("product", lcText))
        .pipe(replace("Product", ucText))
        .pipe(prettier())
        .pipe(gulp.dest(`./src/api/modules/${lcText}/`)),
      gulp
        .src("gulpfile.js/modules/root.route.ts")
        .pipe(
          rename(function (path) {
            path.basename = path.basename.replace("root", options.module);
          })
        )
        .pipe(replace("root.route", `${lcfucText}.route`))
        .pipe(replace("root", lcText))
        .pipe(replace("Root", ucText))
        .pipe(prettier())
        .pipe(gulp.dest(`./src/api/routes/route`)),
      gulp
        .src("./src/api/routes/index.ts")
        .pipe(insert.prepend(`${imprt}`))
        .pipe(insert.append(`${route}`))
        .pipe(prettier())
        .pipe(gulp.dest("./src/api/routes"))
    );
  } else {
    const imprt = `import ${lcText}Router from "./route/${lcText}.route";`;
    const route = `routes.use("/${lcText}",passport.authenticate("jwt", { session: false }),${lcText}Router);`;
    return (
      gulp
        .src("gulpfile.js/modules/good/**/*")
        .pipe(
          rename(function (path) {
            path.basename = path.basename.replace("good", options.module);
          })
        )
        .pipe(replace("goodService", `${lcfucText}Service`))
        .pipe(replace("good", lcText))
        .pipe(replace("Good", ucText))
        .pipe(prettier())
        .pipe(gulp.dest(`./src/api/modules/${lcText}/`)),
      gulp
        .src("gulpfile.js/modules/root.route.ts")
        .pipe(
          rename(function (path) {
            path.basename = path.basename.replace("root", options.module);
          })
        )
        .pipe(replace("root.route", `${lcfucText}.route`))
        .pipe(replace("root", lcText))
        .pipe(replace("Root", ucText))
        .pipe(prettier())
        .pipe(gulp.dest(`./src/api/routes/route`)),
      gulp
        .src("./src/api/routes/index.ts")
        .pipe(insert.prepend(`${imprt}`))
        .pipe(insert.append(`${route}`))
        .pipe(prettier())
        .pipe(gulp.dest("./src/api/routes"))
    );
  }
});
