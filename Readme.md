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
```js
var Local = require('local')
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

### Locale
```js
var locale = local.locale('spanish')
locale('hello') -> hola
```

### Storage
#### Use Memory Storage
Memory is always used.
```js
var local = new Local() 
```

#### Use FileSystem Storage
```js
var local = new Local() // first argument should be a path
	local.storeTo('fileSystem', '/your/file/local.json')
```

#### Use Custom Storage
```js
// register custom storage
Local
.storage('myStorage')
.init(function(done){
	// ...
})
.getter(function(parent, query, language, translation, done){
	// ...
})
.setter(function(parent, query, language, done){
	// ...
})

// instantiate
var local = new Local()
	local.storeTo('myStorage') // first argument is not empty but not a path
```



## Tests
Tests are written with Mocha.js. To run the tests install mocha and run the tests with npm test.  
```
npm install mocha -g
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
