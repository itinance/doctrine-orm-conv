doctrine-orm-conv
======

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ doctrine-orm-conv install -g doctrine-orm-conv
$ doctrine-orm-conv COMMAND
running command...
$ doctrine-orm-conv (-v|--version|version)
doctrine-orm-conv/0.0.0 darwin-x64 node-v15.5.0
$ doctrine-orm-conv --help [COMMAND]
USAGE
  $ doctrine-orm-conv COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`doctrine-orm-conv hello [FILE]`](#doctrine-orm-conver-hello-file)
* [`doctrine-orm-conv help [COMMAND]`](#doctrine-orm-convicer-help-command)

## `doctrine-orm-conv hello [FILE]`

describe the command here

```
USAGE
  $ doctrine-orm-conv hello [FILE]

OPTIONS
  -c, --columns    include columns
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ doctrine-orm-conv hello ./doctrine/customer.orm.yml
```

_See code: [src/commands/hello.ts](https://github.com/itinance/doctrine-orm-conv/blob/v0.0.0/src/commands/hello.ts)_

## `doctrine-orm-conv help [COMMAND]`

display help for doctrine-orm-conv

```
USAGE
  $ doctrine-orm-conv help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

