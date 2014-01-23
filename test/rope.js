var rope = require('../index.js');
var assert = require('assert');

describe('Rope', function() {
  var r, s = 'hello world';

  describe('basic operation', function() {
    it('should be created', function() {
      r = rope(s);
    });
    it('should match the native string in length', function() {
      assert(r.length == s.length);
    });
    it('should be equal to the native string', function() {
      assert(r == s);
    });
  });
});
