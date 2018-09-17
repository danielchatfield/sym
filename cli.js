#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var Configstore = require('configstore');
var linky = require('./index.js');
var pkg = require('./package.json');
var notifier = require('update-notifier')({
  pkg: pkg
});
var path = require('path');
var optimist = require('optimist');
var argv = optimist.argv;
var conf = new Configstore('linky');

var normalizeDestFolder = function(src) {
    if(src) {
        var dirs = src.split(path.sep);
        if(dirs.length !== 0) {
            if(dirs[dirs.length-1] === '') {
                return dirs[dirs.length-2];
            } else {
                return dirs[dirs.length-1];
            }
        }
    }

    return '[source-folder]'; //No source set so we don't know what the folder will be called
};

var doLink = function() {
    var src = argv.src || conf.get('src');
    var dest = argv.dest || conf.get('dest');

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

    dest = path.join(dest, normalizeDestFolder(src));

    linky(src, dest);

    console.log(chalk.green('Link created'));
};

var setSource = function() {
    conf.set('src', process.cwd());
    var msg = chalk.cyan('Source set to: ') + chalk.cyan.bold(process.cwd());
    console.log(msg);
};

var setDest = function() {
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
    var padding = '      ';
    var usage = padding + chalk.cyan('sym src') + '  - sets the current working directory as the source\n' +
                padding + chalk.cyan('sym dest') + ' - sets the current working directory as the destination\n' +
                padding + chalk.cyan('sym link') + ' - creates the symbolic link\n' +
                padding + padding + chalk.white('Optionally specify the src and dest using the flags ') + chalk.cyan('-src') + ' and ' + chalk.cyan('-dest');
    console.log(usage);

    console.log('\n\n\n');

    var src = conf.get('src');
    var dest = conf.get('dest');

    if(src) {
        console.log(padding + 'Source set to:\n' + padding + padding + chalk.cyan.bold(src));
    }

    if(dest) {
        var destFolder = normalizeDestFolder(src);
        console.log(padding + 'Destination set to:\n' + padding + padding + chalk.cyan.bold(dest + path.sep + destFolder));
    }

    return;
}

var command = argv._[0];

if(command === 'src') {
    setSource();
}

if(command === 'dest') {
    setDest();
}

if(command === 'link' || argv.f) {
    doLink();
}

