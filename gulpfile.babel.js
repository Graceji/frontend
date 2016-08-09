import gulp from 'gulp';
import browersync from 'browser-sync';
import proxyMiddleware from 'http-proxy-middleware';


let bs = browersync.create();

gulp.task('default', () => console.log(browersync.create)); 

gulp.task('test', () => {
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

  gulp.watch(['src/*.html'], () => {
    console.log(bs.reload);
    bs.reload();
  });
});

gulp.task('tmpl', () => {
  let src = ['src/*.html'];
  let dest = 'build/';
  gulp.src(src)
    .pipe(gulp.dest(dest));
});
