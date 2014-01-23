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

  describe('splitting', function() {
    it ('should split nodes over SPLIT_LENGTH', function() {

      // store old values
      var sl = rope.SPLIT_LENGTH;
      var jl = rope.JOIN_LENGTH;

      // set new values
      rope.SPLIT_LENGTH = 4;
      rope.JOIN_LENGTH = 2;
      
      // force adjust by removing nothing
      r.remove(0, 0);

      // value check
      assert(r == s);

      // structure checks
      assert(typeof r._value == 'undefined');
      assert(typeof r._left != 'undefined');
      assert(typeof r._left._value == 'undefined');
      assert(typeof r._left._left != 'undefined');
      assert(typeof r._left._left._value != 'undefined');
      assert(typeof r._left._left._left == 'undefined');
      assert(typeof r._left._left._right == 'undefined');
      assert(typeof r._left._right != 'undefined');
      assert(typeof r._left._right._value != 'undefined');
      assert(typeof r._left._right._left == 'undefined');
      assert(typeof r._left._right._right == 'undefined');
      assert(typeof r._right != 'undefined');
      assert(typeof r._right._value == 'undefined');
      assert(typeof r._right._left != 'undefined');
      assert(typeof r._right._left._value != 'undefined');
      assert(typeof r._right._left._left == 'undefined');
      assert(typeof r._right._left._right == 'undefined');
      assert(typeof r._right._right != 'undefined');
      assert(typeof r._right._right._value != 'undefined');
      assert(typeof r._right._right._left == 'undefined');
      assert(typeof r._right._right._right == 'undefined');

      // length checks
      assert(r._left.length == Math.floor(s.length / 2));
      assert(r._left._left.length == Math.floor(Math.floor(s.length / 2) / 2));
      assert(r._left._right.length == Math.floor(s.length / 2) - Math.floor(Math.floor(s.length / 2) / 2));
      assert(r._right.length == s.length - Math.floor(s.length / 2));
      assert(r._right._left.length == Math.floor((s.length - Math.floor(s.length / 2)) / 2));
      assert(r._right._right.length == (s.length - Math.floor(s.length / 2)) - Math.floor((s.length - Math.floor(s.length / 2)) / 2));

      // restore old values
      rope.SPLIT_LENGTH = sl;
      rope.JOIN_LENGTH = jl;
    });
  });
});
