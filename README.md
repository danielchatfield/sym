# sym

A small utility for creating Symbolic/Junction links

## Getting Started
`sym` requires `node`, if you don't have node then install that first.

Install the module with: `npm install sym`

### Linking a directory

This will create a symbolic link (junction link on Windows) called `some-directory` in `some-other-place`.

### `sym src`

This command selects the current working directory as the source directory.

### `sym dest [folder]`

This command selects the current working directory as the destination directory. If folder is specified then the link will be created with the specified name, otherwise the source folder name will be used.

### `sym link --src=/some/path --dest=/some/other/path`

This command makes the link using the selected paths or you can specify the source and destination paths via their respective command line flags.



## Credits

@satazor - a lot of code stolen from `bower`

## License
Copyright (c) 2013 Daniel Chatfield. Licensed under the MIT license.
