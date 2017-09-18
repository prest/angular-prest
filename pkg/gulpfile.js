const gulp = require('gulp');
const path = require('path');
const ngc = require('gulp-ngc');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const package = require('./package.json');
const exec = require('child_process').exec;
const tsconfigJson = require('./tsconfig.json');
const runSequence = require('run-sequence');
const karmaServer = require('karma').Server;

const packageName = package.name;
const moduleName = packageName.split('/')[1] ? packageName.split('/')[1] : packageName;

const srcPath = './src';
const distPackagePath = tsconfigJson.compilerOptions.outDir;
const distBundlesPath = path.join(distPackagePath, 'bundles')


gulp.task('clean', () => {
  return gulp.src(distPackagePath, { read: false })
    .pipe(clean({ force: true }));
});


gulp.task('copy-html-css', () => {
  return gulp.src([srcPath + '/**/*.html', srcPath + '/**/*.css'])
    .pipe(gulp.dest(path.join(distPackagePath, 'src')));
});


gulp.task('transpile', () => {
    return ngc('tsconfig.json');
});


gulp.task('rollup', (cb) => {
  exec('rollup -c', function (err, stdout, stderr) {
    cb(err);
  });
});


gulp.task('replace-ng-template-styles', () => {
  var stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g,
    stringRegex = /(['`"])((?:[^\\]\\\1|.)*?)\1/g,
    templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*([,}]))/gm;

  function replaceStringsWithRequires(match) {
    match = match.replace('templateUrl', 'template');
    match = match.replace('styleUrls', 'styles');

    return match.replace(stringRegex, function (match, quote, url) {
      if (url.charAt(0) !== ".") {
        url = "./" + url;
      }

      return "require('" + url + "')";
    });
  }

  return gulp.src(path.join(distPackagePath, '**/*.component.js'))
    .pipe(replace(templateUrlRegex, replaceStringsWithRequires))
    .pipe(replace(stylesRegex, replaceStringsWithRequires))
    .pipe(gulp.dest(distPackagePath));
});


gulp.task('minify', (cb) => {
  return gulp.src(path.join(distBundlesPath, moduleName + '.umd.js'))
    .pipe(uglify({
      ie8: true
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(distBundlesPath));
});


gulp.task('copy-package', (cb) => {
  return gulp.src('./package_dist.json')
    .pipe(rename('package.json'))
    .pipe(gulp.dest(distPackagePath));
});


gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});


gulp.task('dev', ['build'], () => {
  return gulp.watch([
    '**/*.ts',
    '**/*.html',
    '**/*.css',
    './src/**/assets/**',
    '!**/*.ngfactory.ts',
    '!**/*.ngsummary.json',
    '!**/*.ngstyle.ts'
  ], ['build']);
});


gulp.task('build', (done) => {
  runSequence(
    'clean',
    'transpile',
    'copy-html-css',
    'rollup',
    'minify',
    'replace-ng-template-styles',
    'copy-package',
    function() {
      done();
    }
  );
});


gulp.task('default', ['build']);
