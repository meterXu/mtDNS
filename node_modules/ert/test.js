var assert = require('assert');
var ert = require('./');

var req = {
  params: {val: 'foo'},
  query: {val: 'bar'},
  body: {val: 'baz'}
};
assert.equal(ert(req, '/:val/$val/@val/[1 + 1]/["[" + :val + $val + @val + "]"]'),
  '/foo/bar/baz/2/[foobarbaz]');

assert.equal(ert(req, '[{foo:"bar"}[:val]]'), 'bar');

console.log('Tests Passed');