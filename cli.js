#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var Configstore = require('configstore');
var linky = require('./index.js');
var notifier = require('update-notifier')({
  packagePath: './package.json'
});
var path = require('path');
var optimist = require('optimist');
var argv = optimist.argv;
var conf = new Configstore('linky');

var normalizeDestFolder = function(destFolder, src) {
    if(!destFolder) {
        var dirs = src.split(path.sep);
        if(dirs.length === 0) {
            return '[source-folder]';
        }
        if(dirs[dirs.length-1] === '') {
            return dirs[dirs.length-2];
        } else {
            return dirs[dirs.length-1];
        }
    }
};

var doLink = function() {
    var src = argv.src || conf.get('src');
    var dest = argv.dest || conf.get('dest');


    var destFolder = conf.get('destFolder');
    if(!src) {
        var srcmsg = chalk.red('Source not set, run ') +
                  chalk.cyan('sym src') +
                  chalk.red(' first.');
        return console.error(srcmsg);
    }
    if(!dest) {
        var destmsg = chalk.red('Destination not set, run ') +
                  chalk.cyan('sym dest') +
                  chalk.red(' first.');
        return console.error(destmsg);
    }

    destFolder = normalizeDestFolder(destFolder, src);

    linky(src, path.join(dest, destFolder));
};

var setSource = function() {
    conf.del('src');
    conf.set('src', process.cwd());
    var msg = chalk.cyan('Source set to: ') + chalk.cyan.bold(process.cwd());
    console.log(msg);
};

var setDest = function() {
    conf.del('destFolder');
    conf.set('dest', process.cwd());
    var msg = chalk.cyan('Destination set to: ') + chalk.cyan.bold(process.cwd() + path.sep + '[src-folder]');
    console.log(msg);
};


// Is there an update?
if(notifier.update) {
    notifier.notify(true);
}


// I know this is hideous and I promise I will refactor
// it when I get a chance. It works for now.

if(argv._.length === 0) {
    var usage = 'Run ' + chalk.cyan('sym src') + ' in the source folder and ' +
                chalk.cyan('sym dest') + ' in the destination folder then ' +
                chalk.cyan('sym link.');
    console.log(usage);

    var src = conf.get('src');
    var dest = conf.get('dest');
    var destFolder = normalizeDestFolder(conf.get('destFolder'), src);

    var msg = chalk.cyan('Source set to: ') + chalk.cyan.bold(src);
    console.log(msg);

    msg = chalk.cyan('Destination set to: ') + chalk.cyan.bold(dest + path.sep + destFolder);
    console.log(msg);

    return;
}

var command = argv._[0];

if(command === 'src') {
    setSource();
}

if(command === '!src') {
    setSource();
    doLink();
}

if(command === 'dest') {
    setDest();
    doLink();
}

if(command === 'link') {
    doLink();
}

