doctrine-orm-conv
======

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->


# Intro

## The story:

I had to convert a really big bunch of entities across many Symfony and Doctrine based projects from the `orm.yml`-Format into the `@Annotations` format and looked for an approach how to automate. Long story short: there was no proper way instead of migrating everything by myself. 

Since the manual migration was very time-consuming and also very error-prone, I decided to automate this.

** DON'T JUDGE ME I AM FAMOUS **

This tool is just a one-shot-helper-tool. *No clean code*, *no tests*, just a single tool for *fire-and-forget*. 
I decided to publish the tool in case someone else also has the need for it.

*Fun fact: although this tool helps to convert PHP code and was written for PHP projects, I ended up writing it with TypeScript as a NodeJS CLI. 
The reason is quite funny: I started with PHP, but it was too time-consuming to find a suitable way to parse YML files without having to install any PECL extensions and without needing big frameworks that come with everything for that. NodeJS was the leaner and faster option here (although I am not a Node developer, as you might notice when looking at the code).*


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

