/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',
  'angular2-modal',
  'angular2-modal/plugins/bootstrap',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+transactions',
  'app/+transactions/+add',
  'app/+transactions/+list',
  'app/+dashboard',
  'app/+reports',
  'app/dashboard/account-card',
  'app/tag-input',
  'app/tag-input-item',
  'app/notifications/notification',
  'app/notifications/notification/badge',
  'app/notifications/notification/account',
  'app/+overview',
  'app/badge-list',
  'app/finance-health-indicator',
  'app/notifications/notification/financial-health/financial-health',
  'app/notifications/notification/financial-health',
  'app/+badges',
  'app/guide',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {
  'vendor/ng2-bootstrap': {
          defaultExtension: 'js',           
        }
};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    'moment': 'vendor/moment/moment.js',
    'ng2-bootstrap': 'vendor/ng2-bootstrap/bundles/ng2-bootstrap.js',
    'angular2-modal': 'vendor/angular2-modal'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
