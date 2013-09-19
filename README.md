# linky 

A small utility for creating Symbolic/Junction links

## Getting Started
`linky` requires `node`, if you don't have node then install that first.

Install the module with: `npm install linky`

### Linking a directory

This will create a symbolic link (junction link on Windows) called `some-directory` in `some-other-place`.

### `linky src`

This command selects the current working directory as the source directory.

### `linky dest [folder]`

This command selects the current working directory as the destination directory. If folder is specified then the link will be created with the specified name, otherwise the source folder name will be used.

### `linky link --src=/some/path --dest=/some/other/path`

This command makes the link using the selected paths or you can specify the source and destination paths via their respective command line flags.

## Shortcuts

It is common to want to create a link after either selecting the source or the destination (depending on in which order you selected them). You can do this by prepending the command with an exclamation mark:

```
$ linky src
$ linky !dest
```



## Credits

@satazor - a lot of code stolen from `bower`

## License
Copyright (c) 2013 Daniel Chatfield. Licensed under the MIT license.
