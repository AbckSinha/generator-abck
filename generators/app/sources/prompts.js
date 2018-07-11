'use strict';

var bowerConfig = require('./bower-config.js');
var cordovaConfig = require('./cordova-config.js');

module.exports = {
    prompts: [{
        type: 'input',
        name: 'appName',
        message: 'Enter a name for your project',
        default: this.appname                        //default to current folder
    }, {
        type: 'input',
        name: 'appId',
        message: '\nEnter an app identifier for your project \ne.g. com.company.project\n',
      //  validate: utils.validateAppId
    }, {
        type: 'checkbox',
        name: 'appType',
        message: 'Specify app type ?',
        choices: [{
            name: 'Blank',
            value: 'includeBlank',
            checked: true
        }, {
            name: 'Tabs',
            value: 'includeTabs',
            checked: false
        }, {
            name: 'Sidemenu',
            value: 'includeSideMenu',
            checked: false
        }]
    },
    //_______________ ionic css_______________________________
    {
        type: 'list',
        name: 'ionicCss',
        message: '\nInclude Ionic styles as CSS or Sass\n',
        choices: [
            {
                name: 'Ionic CSS (faster, for starters)',
                value: true
            },
            {
                name: 'Ionic Sass (more flexible, for pros)',
                value: false
            }
        ]
    },
    //_____________________ bower packages______________________________________
    {
        type: 'checkbox',
        name: 'bowerPackages',
        message: '\nChoose additional bower packages \nBesides angular, ionic, angular-ui-router and ngCordova.\n',
        choices: bowerConfig.optional
    },
    //__________________select platforms_________________________________
    {
        type: 'checkbox',
        name: 'platforms',
        message: '\nSelect Cordova platforms \nOnly works if you have the platforms correctly set up.\n',
        choices: cordovaConfig.platforms
    },
    //_________________select plugins_______________________________________
    {
        type: 'checkbox',
        name: 'plugins',
        message: '\nSelect Cordova plugins \nInstall more later at any time.\n',
        choices: cordovaConfig.plugins
    },
    ]
}

