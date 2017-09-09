# ert

Express routing templates provides a simple micro-templating syntax for building strings from a template and a `request` object.

[![Build Status](https://travis-ci.org/ForbesLindesay/ert.png?branch=master)](https://travis-ci.org/ForbesLindesay/ert)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/ert.png)](https://gemnasium.com/ForbesLindesay/ert)

## Installation

    $ npm install ert

## Usage

```js
var ert = require('ert');
var express = require('express');
var app = express();

app.get('/:package', function (req, res) {
  res.redirect(ert(req, '/package/:package'));
});

app.listen(3000);
```

## Syntax

### Code Blocks

e.g.

```js
ert(req, '/foo/bar/[req.parms.x || "default-x"]')
```

Code in squre brackets (`[` and `]`) is evalutated as a JavaScript expression.  It has `req` available as an object.  It also supports shortcuts, so you could write the above as:

```js
ert(req, '/foo/bar/[:x || "default-x"]')
```

### Shortucts

There are characters that are shortucts, the defaults of these are:

```js
exports.shortcutMap = {
  ':': 'req.params',
  '$': 'req.query',
  '@': 'req.body'
};
```

These can be used directly like:

```js
ert(req, '/foo/bar/:x')
```

which is equivallent to:

```js
ert(req, '/foo/bar/[req.params && req.params["x"]]')
```

## API

### ert(req, src) or ert.translate(req, src)

Transforms the string with `req` and returns the resulting string.  It caches the compiled function so should be pretty good for performance.

### ert.compile(src)

Compiles `src` and returns a JavaScript expression as a string.  This can be used to generate client side code with something like:

```js
function client(name) {
  return 'function name(req){return ' + ert.compile(src) + '}';
}
```

### ert.compileFn(src)

Compiles `src` and returns a function which expects a single argument, `request`.

## License

MIT
