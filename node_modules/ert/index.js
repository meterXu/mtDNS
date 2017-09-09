var parser = require('character-parser');

var cache = {};

exports = (module.exports = translate);

exports.shortcutMap = {
  ':': 'req.params',
  '$': 'req.query',
  '@': 'req.body'
};

exports.compile = compile;
function compile(str) {
  var i = 0;
  var buf = [];
  var currentString = '';
  var wasString = false;
  function pushCharacter(c) {
    if (!wasString) {
      currentString = '';
      buf.push('');
    }
    wasString = true;
    currentString += c;
    buf[buf.length - 1] = JSON.stringify(currentString);
  }
  function pushExpression(e) {
    buf.push('(' + e + ')');
    wasString = false;
  }
  while (i < str.length) {
    if (exports.shortcutMap.hasOwnProperty(str[i]) && /[a-zA-Z]/.test(str[i + 1]) && (i + 1) < str.length) {
      var expansion = exports.shortcutMap[str[i]];
      var exp = '';
      while(/[\w\-]/.test(str[++i]) && i < str.length) exp += str[i];
      i--;
      pushExpression(expansion + ' && ' + expansion + '["' + exp + '"]');
    } else if (str[i] === '[') {
      var section = parser.parseMax(str, {start: i + 1});
      var state = parser.defaultState();
      var exp = '';
      for (var x = 0; x < section.src.length; x++) {
        if (exports.shortcutMap.hasOwnProperty(section.src[x]) &&
          !state.lineComment && !state.blockComment && !state.singleQuote && !state.doubleQuote &&
          /[a-zA-Z]/.test(section.src[x + 1]) && x + 1 < section.src.length) {
          exp += '(' + exports.shortcutMap[section.src[x]] + ' && ' + exports.shortcutMap[section.src[x]] + '["';
          while(/[\w\-]/.test(section.src[++x]) && x < section.src.length) exp += section.src[x];
          x--;
          exp += '"] || "")';
        } else {
          exp += section.src[x];
        }
        if (x < section.src.length) parser.parseChar(section.src[x], state);
      }
      pushExpression(exp);
      i = section.end;
    } else if (str[i] === '\\') {
      pushCharacter(str[++i]);
    } else {
      pushCharacter(str[i]);
    }
    i++;
  }
  return buf.join('+');
}

exports.compileFn = compileFn;
function compileFn(str) {
  var exp;
  try {
    exp = compile(str);
  } catch (ex) {
    ex.message += ' when compiling ' + JSON.stringify(str);
    throw ex;
  }
  try {
    return Function('req', 'return ' + exp);
  } catch (ex) {
    ex.message += ' when compiling ' + JSON.stringify(str) + ' to `' + exp + '`';
    throw ex;
  }
}

exports.translate = translate;
function translate(req, str) {
  var fn = cache['key:' + str];
  if (!fn) {
    fn = compileFn(str)
    cache['key:' + str] = fn;
  }
  return fn(req);
}