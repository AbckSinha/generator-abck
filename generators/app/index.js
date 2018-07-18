'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var npmRun = require('npm-run');
var npm = require('npm');

var prompts = require('./sources/prompts.js');
var shell = require('./sources/shellHelper.js');

var MyAppGenerator = class extends Generator {

  initializing() {
    this.pkg = require('../../package.json');
    this.fileCount = fs.readdirSync('.').length;
    // abort when directory is not empty on first run
    if (this.fileCount > 0) {
      this.log(chalk.red('Non-empty directory. Cordova needs an empty directory to set up project'));
      process.exit(1);
    }


  }

  prompting() {
    var done = this.async();
    this.log(
      yosay(`Welcome to Full Fledged Ionic2 ${chalk.red('generator-abck')} generator!`)
    );

    // const prompts = [{
    //   type: 'input',
    //   name: 'projectName',
    //   message: 'Enter a name for your project',
    //   default: this.appname                        //default to current folder
    // },{
    //   type: 'checkbox',
    //   name: 'appType',
    //   message: 'Specify app type ?',
    //   choices: [{
    //     name: 'Blank',
    //     value: 'includeBlank',
    //     checked: true
    //   },{
    //     name: 'Tabs',
    //     value: 'includeTabs',
    //     checked: false
    //   },{
    //     name: 'Sidemenu',
    //     value: 'includeSideMenu',
    //     checked: false
    //   }]
    // }];

    return this.prompt(prompts.prompts).then(props => {
      // To access props later use this.props.projectName;
      this.props = props;
      if (props.appType.length > 1) {
        this.log(chalk.red('Please select only one app type'));
        process.exit(1);
      }


      // execute multiple commands in series
      // shell.series([

     //  npmRun.exec(['npm', 'install', 'ionic', '-g'].join(' '));
     //  npmRun.exec(['ionic', 'start', 'myapp', 'tabs'].join(' '));
     //  npmRun.exec(['bower','install' ].join(' '));
       // 'npm install ionic --save',
       // 'ionic start myApp tabs'
      // ], function (err) {
      //   console.log('executed many commands in a row');
      // });

      // npmRun.exec('npm install ionic --save', 'ionic start myApp tabs', (err) => {
      //   this.log(
      //     chalk.green(`Installed Ionic`)
      //   );
      // });

      npmRun.exec('ionic start myApp tabs', (err) => {
        this.log(
          chalk.green(`creating cordova project ======>>>>>>>>>`)
        );
      });
      done();
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt'),
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
  }

  install() {
     let installConf = {
      npm: true,
      skipInstall: false
    };

    this.installDependencies(installConf);

    // npmRun.exec('npm install', (err) => {
    //     this.log(
    //       chalk.green(`installing dependencies ...`)
    //     );
    //   });
  }

    end() {
    this.log(yosay(
      'All done! To get going run:\n' +
      chalk.green('go to root of folder and run  \n') +
      'ng serve'
    ));
  }
}

module.exports = MyAppGenerator;

