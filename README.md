slicer
======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/slicer.svg)](https://npmjs.org/package/slicer)
[![Downloads/week](https://img.shields.io/npm/dw/slicer.svg)](https://npmjs.org/package/slicer)
[![License](https://img.shields.io/npm/l/slicer.svg)](https://github.com/itinance/slicer/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g slicer
$ slicer COMMAND
running command...
$ slicer (-v|--version|version)
slicer/0.0.0 darwin-x64 node-v15.5.0
$ slicer --help [COMMAND]
USAGE
  $ slicer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`slicer hello [FILE]`](#slicer-hello-file)
* [`slicer help [COMMAND]`](#slicer-help-command)
* [`slicer prepare [FILE]`](#slicer-prepare-file)

## `slicer hello [FILE]`

describe the command here

```
USAGE
  $ slicer hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ slicer hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/itinance/slicer/blob/v0.0.0/src/commands/hello.ts)_

## `slicer help [COMMAND]`

display help for slicer

```
USAGE
  $ slicer help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `slicer prepare [FILE]`

describe the command here

```
USAGE
  $ slicer prepare [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/prepare.ts](https://github.com/itinance/slicer/blob/v0.0.0/src/commands/prepare.ts)_
<!-- commandsstop -->
