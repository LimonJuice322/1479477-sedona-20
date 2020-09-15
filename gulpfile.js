const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const minify = require("gulp-minify");
const htmlmin = require("gulp-htmlmin");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
        .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.mozjpeg({progressive: true}),
          imagemin.svgo()
        ]))
}

exports.images = images;

// WebP

const webP = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("source/img"))
}

exports.webp = webP;

// Sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
             .pipe(svgstore())
             .pipe(rename("sprite.svg"))
             .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html",
    "source/css/*.css"
  ], {
    base: "source"
     })
            .pipe(gulp.dest("build"))
}

exports.copy = copy;

// Delete

const clean = () => {
  return del("build");
}

exports.clean = clean;

// JS

const js = () => {
  return gulp.src("source/js/*.js")
        .pipe(minify())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"))
}

exports.js = js;

// HTML

const html = () => {
  return gulp.src("source/*.html")
        .pipe(htmlmin())
        .pipe(gulp.dest("build"))
}

exports.html = html;

// Build

const build = gulp.series(
      clean,
      copy,
      html,
      js,
      styles,
      sprite,
    )

exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  build, server, watcher
);
