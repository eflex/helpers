var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  gulp.watch("./src/*", function(){
    return gulp.src("./src/*")
      .pipe(babel())
      .pipe(gulp.dest("./dist/"));
  });
});
