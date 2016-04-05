# Local
Beautiful localization library for node.js. 

```
// require local
var Local = require('local')

// create local instance
var local = new Local('/your/dir/local.json')

// set: define "hello" as "hello" in spanish
local.set('hello').in('es').as('hola')

// get "hello" in spanish
local.get('hello').in('es') // -> hola
```

## Features
- JSON File Storage
- Stores JSON in memory
- Save Translation
- Query Translation

## API

### new Local(*filePath*)
### .set(*baseLocale*)
### .get(*baseLocale*)
### .in(*lang*)
### .as(*lang*)

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
