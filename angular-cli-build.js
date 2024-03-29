/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'moment/moment.js',
      'ng2-bootstrap/bundles/ng2-bootstrap.js',
      'angular2-modal/**/*.js',
      'ng2-bootstrap/**/*.js',
      'bootstrap-material-design/dist/js/*.js',
      'bootstrap-material-design/dist/css/*.css',
      'arrive/minified/arrive.min.js',
      'ng2-bs3-modal/**/*.js',
      'ng2-table/**/*.js'
     ]
  });
};
