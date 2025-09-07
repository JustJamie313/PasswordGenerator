#!/usr/bin/env node

// Author: Jamie Miller              
// Organization: Drawing on Humanity 
// Date: September 4, 2025           

//Dependencies
import chalk from 'chalk';
import clipboard from 'clipboardy';
import pkg from './package.json' with {type: 'json'};
import helpText from './help.js';

const generator = {
  chalk: {
    success: chalk.bold.green,
    info: chalk.bold.cyan,
    error: chalk.bold.red,
    highlight: chalk.bold.yellow
  },
  charset: {
    letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!$&()-_=+[]|:.<>?/',
    setArray: function () { return [this.letters, this.numbers, this.symbols]; },
    activeSet: [],
    activeSetLength: 0
  },
  command: {
    args: process.argv.slice(2),
    com: function () { return this.args[0]; },
    length: function () { 
      if(parseInt(this.args[1],10) < 1 || isNaN(parseInt(this.args[1],10))){
	generator.processError(generator.errors().PASSWORD_LENGTH_ERROR);
      } else {
        return parseInt(this.args[1],10);
      }
    },
    validFlags: ["-l", "-n", "-s", "-ln", "-ls", "-ns"],
    flag: function () { 
      let selectedFlags = this.args.slice(2).filter(f => this.validFlags.includes(f));
      if (selectedFlags.length > 1) {
        generator.processError(generator.errors().FLAG_LIMIT_ERROR);
      } else {
        if (this.args.slice(2).length > 0 && selectedFlags.length === 0) {
          generator.processError(generator.errors().INVALID_FLAG_ERROR);
        } else {
          return selectedFlags[0];
        }
      }
    },
  },
  errors: function () { 
    return {
      "COMMAND_ERROR":[
        1,
        `generate ${generator.chalk.highlight("pw")} <length> [ ${generator.command.validFlags} ]\ngenerate ${generator.chalk.highlight('--help')}\ngenerate ${generator.chalk.highlight('--version')}`,
        "Please check command to ensure you are using one of the valid command formats."
      ],
      "PASSWORD_LENGTH_ERROR": [
        2,
        `generate pw ${generator.chalk.highlight('<length>')} [ ${generator.command.validFlags} ] \n`,
        "Please check password length to ensure you are using a positive whole number.\nNOTE: recommend minimum length of 20 characters for most passwords or 24 characters for higher security needs."
      ],
      "FLAG_LIMIT_ERROR": [
        3,
        `generate pw <length> ${generator.chalk.highlight('['+generator.command.validFlags+']')}. (Limit 1 flag)`,
        "Please check the flag to ensure you are using only one of the valid flags."
      ],
      "INVALID_FLAG_ERROR": [
        4,
        `generate pw <length> ${generator.chalk.highlight('['+generator.command.validFlags+']')}. (Limit 1 flag)`,
        "Please check the flag to ensure you are using only one of the valid flags."
      ]
    };
  },
  writeToClipboard: function () {
    clipboard.writeSync(generator.generatedPassword.password);
    console.log(generator.chalk.highlight(`Password copied to clipboard.`));
    process.exit(0);
  },
  generateOutput: function () {
    console.log(generator.chalk.success(`Generated Password: ${generator.generatedPassword.password}`));
    console.log(generator.chalk.info(`Password Strength: ${generator.generatedPassword.entropy()} ${generator.generatedPassword.strength()}`));
    this.writeToClipboard();
  },
  generatedPassword: {
    password: '',
    entropy: function () { return Math.round(Math.log2(generator.charset.activeSetLength)*generator.command.length()); },
    strength: function () { return this.gradeMap.find(([threshold]) => Math.round((this.entropy()/125) * 100) < threshold)[1]; },
    gradeMap: [
      [60, "F - WEAK"],
      [70, "D - WEAK"],
      [80, "C - MODERATE"],
      [90, "B - MODERATE"],
      [100, "A - STRONG"],
      [Infinity, "A+ - VERY STRONG"]
    ]
  },
  updateCharset: function () {
    let flag = generator.command.flag();
    let set = generator.charset.activeSet;
    if(!flag.includes("l")) set.splice(set.indexOf(generator.charset.letters),1);
    if(!flag.includes("n")) set.splice(set.indexOf(generator.charset.numbers),1);
    if(!flag.includes("s")) set.splice(set.indexOf(generator.charset.symbols),1);
  },
  generatePassword: function () {
    generator.generatedPassword.password = '';
    generator.charset.activeSet = [...generator.charset.setArray()]
    if(generator.command.flag()){
      generator.updateCharset();
    }
    let set = generator.charset.activeSet.join('');
    generator.charset.activeSetLength = set.length;
    for (let i = 0; i < generator.command.length(); i++) {
      const randomIndex = Math.floor(Math.random() * set.length);
      generator.generatedPassword.password += set[randomIndex];
    }
    generator.generateOutput();
  },
  displayHelp: function () {
    console.log(helpText);
    process.exit(0);
  },
  displayVersion: function () {
    console.log(`Password Generator Version: ${pkg.version}`);
    process.exit(0);
  },
  processCommand: function() {
    if(generator.command.com() === "pw"){
      generator.generatePassword();
    }
    if(generator.command.com() === "--help") {
      generator.displayHelp();
    }
    if(generator.command.com() === "--version") {
      generator.displayVersion();
    }
    generator.processError(generator.errors().COMMAND_ERROR);
  },
  processError: function (error) {
    let errorKey = '';
    for (const [key, value] of  Object.entries(generator.errors())) {
      if (value[0] === error[0]) errorKey = key;
    }
    let output = `
${errorKey}:${error[0]}
${error[1]}
${error[2]}
`;
    console.log(generator.chalk.error(output));
    process.exit(1);
  }
}

generator.processCommand();