const path = require('path');
const tsconfigJson = require('./tsconfig.json')
const packageJson = require('./package.json')

const packageName = packageJson.name;
const moduleName = packageName.split('/')[1] ? packageName.split('/')[1] : packageName;

const distPath = './dist';
const distPackagePath = tsconfigJson.compilerOptions.outDir;
const distBundlesPath = path.join(distPackagePath, 'bundles')
const srcPath = './src';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/router': 'ng.router',
  '@angular/http': 'ng.http',
  'rxjs/Observable': 'Rx',
  'rxjs/ReplaySubject': 'Rx',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
}

export default {
  sourcemap: true,
  globals: globals,
  name: 'ng.' + moduleName,
  external: Object.keys(globals),
  input: path.join(distPackagePath, 'index.js'),
  output: {
    format: 'umd',
    file: path.join(distBundlesPath, moduleName + '.umd.js')
  }
}
