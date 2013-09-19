/*
 * linky
 * https://github.com/danielchatfield/linky
 *
 * Copyright (c) 2013 Daniel Chatfield
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('graceful-fs');
var mkdirp = require('mkdirp').sync;
var path = require('path');

// Please note that this is a synchronous module,
// only use in cases where blocking is desired.

var isWin = (process.platform === 'win32');

module.exports = function(src, dest, type) {
  var destDir = path.dirname(dest);
  var stat;

  // Check source exists
  try {
    stat = fs.statSync(src);
  } catch (e) {
    if (e.code === 'ENOENT') {
        throw new Error("Source directory does not exist: " + src);
    }
  }

  // Make sure parent directory for link exists
  mkdirp(destDir);

  type = type || (stat.isDirectory() ? 'dir' : 'file');

  try {
    fs.symlinkSync(src, dest, type);
  } catch (e) {
    if(!isWin || e.code !== 'EPERM') {
        throw e;
    }

    // Try with type "junction" on Windows
    // Junctions behave equally to true symlinks and can be created in
    // non elevated terminal (well, not always..)
    
    try {
        fs.symlinkSync(src, dest, 'junction');
    } catch (e) {
        throw new Error("Unable to create link, try running this command in an elevated terminal.");
    }
  }
};
