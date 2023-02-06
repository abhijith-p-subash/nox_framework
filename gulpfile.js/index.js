const gulp = require("gulp");
const fs = require("fs");
// const { snakeCase } = require("../src/core/utils/helpers");
// const rename = require("gulp-rename");
// const replace = require("gulp-replace");
// const prettier = require("gulp-prettier");

function snakeCase(str) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}

const argv = 

gulp.task("sql-module", async function () {
  return new Promise((resolve, reject) => {
    const fileName = process.argv[4];
    fs.mkdirSync(`./src/api/modules/${fileName}`);
    fs.mkdirSync(`./src/api/modules/${fileName}/entity`);
    fs.mkdirSync(`./src/api/routes/route/${fileName}`);

    //   fs.writeFileSync(`./${fileName}.txt`, 'Hello World');

    fs.writeFileSync(
      `./src/api/modules/${fileName}/${fileName}.controller.ts`,
      "test aj"
    );
    fs.writeFileSync(
      `./src/api/modules/${fileName}/${fileName}.service.ts`,
      "test aj"
    );

    fs.writeFileSync(
      `./src/api/modules/${fileName}/entity/${fileName}.dto.ts`,
      "test aj"
    );
    fs.writeFileSync(
      `./src/api/modules/${fileName}/entity/${fileName}.model.ts`,
      "test aj"
    );
    fs.writeFileSync(
      `./src/api/modules/${fileName}/entity/${fileName}.type.ts`,
      "ttt"
    );

    fs.writeFileSync(
      `./src/api/routes/route/${fileName}/${fileName}.route.ts`,
      "test aj"
    );

    // if(err) reject(err);
    resolve();
  });
});

gulp.task("default", function () {
  console.log("Hello from Gulp!");
});

gulp.task("createFile", function () {
  const fileName = process.argv[4]; // Get the file name from the command-line arguments
  fs.writeFileSync(`./${fileName}.txt`, "Hello World");
});
