# DIDKit Node.js package Typescript type definition Example

This repository has a simple example of how to use the types included in the
DIDKit Node.js package.

Running the following command should not output any errors:
```bash
$ npm run test
```

## DIDKit

To use `DIDKit` from its repository, you should first compile and then link the 
dependency using `npm` like so:

```bash
$ cd path/to/didkit
$ make -C lib ../target/test/node.stamp
$ cd lib/node
$ npm link
$ cd path/to/project # could be this one or any other
$ npm link didkit
```

To read more about DIDKit and to see more instructions about dependencies and
build commands [click here](https://github.com/spruceid/didkit).
