import gulp from 'gulp';
import browersync from 'browser-sync';
import proxyMiddleware from 'http-proxy-middleware';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import replace from 'gulp-replace';
import babel from 'gulp-babel';

let cfg = require('./config.json');

let bs = browersync.create();

gulp.task('default', () => console.log()); 

gulp.task('html-t', () => {
  bs.reload();
  gulp.src('src/*.html')
  .pipe(replace('[$staticPath]', cfg.staticPath))
  .pipe(gulp.dest('build/'));
});

gulp.task('sass-t', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/style/'));
});

gulp.task('js-t', () => {
  let src = ['src/js/*.js'];
  let dest = 'build/js/';
  gulp.src(src)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

gulp.task('run', () => {
  let proxy = proxyMiddleware(['/api'], {
    target: 'http://192.168.1.87:8080',
    changeOrigin: true
  });

  bs.init({
    server: {
      baseDir: './src'
    },
    middleware: [proxy],
    port: '3000',
    browser: 'google chrome'
  });

  // 监控html 
  gulp.watch(['src/*.html','src/dompl/*.html'], ['html-t']);
  // 监控sass
  gulp.watch(['src/scss/*.scss'], ['sass-t']);
  // 监控js
  gulp.watch(['src/js/*.js'], ['js-t']);
});

