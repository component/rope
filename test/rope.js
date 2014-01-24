/**
 * Module Dependencies
 */

var rope = require('rope');
var assert = require('assert');

var SPLIT_LENGTH = rope.SPLIT_LENGTH;
var JOIN_LENGTH = rope.JOIN_LENGTH;

function setLowThresholds() {
  rope.SPLIT_LENGTH = 4;
  rope.JOIN_LENGTH = 2;
}

function setDefaultThresholds() {
  rope.SPLIT_LENGTH = SPLIT_LENGTH;
  rope.JOIN_LENGTH = JOIN_LENGTH;
}

/**
 * Tests
 */

describe('Rope', function() {
  var r, s = 'hello world';

  describe('basic operation', function() {
    beforeEach(function() {
      r = rope(s);
    });
    it('should match the native string in length', function() {
      assert(r.length == s.length);
    });
    it('should be equal to the native string', function() {
      assert(r == s);
    });
  });

  describe('splitting/joining', function() {
    it ('should split nodes over SPLIT_LENGTH', function() {

      r = rope(s);

      setLowThresholds();

      // force adjust by removing nothing
      r.remove(0, 0);

      console.log(r);

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

      setDefaultThresholds();
    });

    it('should join nodes under JOIN_LENGTH', function() {

      setLowThresholds();

      r = rope(s);

      setDefaultThresholds();

      // force adjust by removing nothing
      r.remove(0, 0);

      // value check
      assert(r == s);

      // structure checks
      assert(typeof r._value != 'undefined');
      assert(typeof r._left == 'undefined');
      assert(typeof r._right == 'undefined');

      // length check
      assert(r.length == s.length);
    });
  });

  describe('substrings', function() {
    beforeEach(function() {
      r = rope(s);
    });

    it('substring() should behave like native substring()', function() {
      for (var i = -100; i < 100; i++) {
        for (var j = -100; j < 100; j++) {
          assert(r.substring(i, j) == s.substring(i, j));
        }
      }

      setLowThresholds();

      // force adjust by removing nothing
      r.remove(0, 0);

      for (var i = -100; i < 100; i++) {
        for (var j = -100; j < 100; j++) {
          assert(r.substring(i, j) == s.substring(i, j));
        }
      }

      setDefaultThresholds();
    });

    it('substr() should behave like native substr()', function() {
      for (var i = -100; i < 100; i++) {
        for (var j = -100; j < 100; j++) {
          assert(r.substr(i, j) == s.substr(i, j));
        }
      }

      setLowThresholds()

      // force adjust by removing nothing
      r.remove(0, 0);

      for (var i = -100; i < 100; i++) {
        for (var j = -100; j < 100; j++) {
          assert(r.substr(i, j) == s.substr(i, j));
        }
      }

      setDefaultThresholds();

      // force adjust by removing nothing
      r.remove(0, 0);
    });
  });
});
