# Local
Beautiful localization library for node.js. 

```js
var Local = require('local')

var local = new Local()
	local.set('hello').to('hola').in('spanish')
	local.get('hello').in('spanish') // -> hola
```

## Install
```
npm install local
```

## Features
- Ships with JSON Memory and FileStorage (for node.js) Drivers
- Simple Get/Set API
- Easy Instantiation for User Level Localization
- Custom Storage Setter/Getter API

## How to Use

### Initialize

#### With Memory Storage
```js
var Local = require('local')
var local = new Local() // leave it empty
```

#### With FileSystem Storage
```js
var Local = require('local')
var local = new Local('/your/file/local.json')
```

#### With Custom Storage
```js
var Local = require('local')

// register custom storage
Local
.storage('myStorage')
.getter(function(parent, query, language, translation, done){
	// ...
	done()
})
.setter(function(parent, query, language, done){
	// ...
	done()
})

// instantiate
var local = new Local('myStorage')
```

### Set
```js
local
.set('hello')
.to('hola')
.in('spanish')
.then(successCallback) // one result argument
.catch(errorCallback) // one error argument
```

### Get
```js
local
.get('hello')
.in('spanish')
.then(successCallback) // one result argument
.catch(errorCallback) // one error argument
```


## Tests
Running the tests (mocha) is as simple as typing in:
```
npm test
```

## License
The MIT License (MIT)

Copyright (c) 2016 Ádám Halász

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
