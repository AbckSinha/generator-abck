'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');
var fs = require('fs');

var prompts = require('./sources/prompts.js');

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

    return this.prompt(prompts.prompts).then(props => {
      // To access props later use this.props.projectName;
      this.props = props;
      if(props.appType.length>1){
        this.log(chalk.red('Please select only one app type'));
        process.exit(1);
      }
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = MyAppGenerator;

