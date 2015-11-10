var del         = require('del');
var nib         = require('nib');
var gulp        = require('gulp');
var jeet        = require('jeet');
var browserSync = require('browser-sync');
var browserify  = require('browserify');
var stringify   = require('stringify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var uglify      = require('gulp-uglify');
var stylus      = require("gulp-stylus");
var notify      = require('gulp-notify');
var changed     = require('gulp-changed');
var sourcemaps  = require('gulp-sourcemaps');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var reload      = browserSync.reload;
var p = {
  jsx: './src/config/app.js',
  images: './src/static/img/**',
  svg: './src/static/svg/**',
  styl: './src/static/css/*.styl',
  bundle: 'index.js',
  distJs: 'dist/js',
  distCss: 'dist/css',
  distImg: 'dist/img',
  distSVG: 'dist/svg'
};

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './',
      index: './src/views/default/index.html'
    },
    notify: false,
    ghostMode: false
  });
});

// Production
gulp.task('browserify', function() {
  browserify(p.jsx)
    .transform(babelify, { presets: ["es2015"] })
    .transform(stringify(['.html']))
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: false
    }))
    .pipe(uglify())
    //.pipe(sourcemaps.write('./dist/'))
    .on("error", notify.onError())
    .pipe(gulp.dest(p.distJs));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(p.jsx, { debug: true }).transform(babelify, { presets: ["es2015"] }));
  //var bundler = watchify(browserify(p.jsx, watchify.args));
  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write(p.distJs))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({
        stream: true
      })
    );
  }

  bundler.transform(babelify)
    .on('update', rebundle);
  bundler.transform(stringify(['.html']))
    .on('update', rebundle);
  return rebundle();
});



gulp.task('styles', function () {
  return gulp.src(p.styl)
  .pipe(stylus({
    use: [jeet(), nib()],
    compress: true
  }))
  .on("error", notify.onError())
  .pipe(gulp.dest(p.distCss))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('images', function () {
  return gulp.src(p.images)
  .pipe(gulp.dest(p.distImg))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('svg', function () {
  return gulp.src(p.svg)
  .pipe(gulp.dest(p.distSVG))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('watchTask', function() {
  gulp.watch(p.styl, ['styles', 'images', 'svg']);
});

gulp.task('dev', ['clean'], function() {
  process.env.NODE_ENV = 'development';
  gulp.start(['browserSync', 'watchTask', 'watchify', 'styles', 'images', 'svg']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start(['browserify', 'styles', 'images', 'svg']);
});

gulp.task('default', function() {
  console.log('Run "gulp watch or gulp build"');
});
