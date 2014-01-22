
# rope

  `rope` is an implementation of the [rope data structure](https://en.wikipedia.org/wiki/Rope_%28data_structure%29) in JavaScript.

  A rope is an efficient data structure for storing and manipulating very large mutable strings. 
  It reduces memory reallocation and data copy overhead for applications that are constantly operating on very large strings
  by splitting them into multiple smaller strings transparently. Efficient random access is achieved via a binary tree.

  The following table outlines the computational complexity of various operations over strings and ropes of length **n**.

  Operation                                    | Regular JavaScript String                     | Rope 
  ---------------------------------------------|-----------------------------------------------|------------
  Initialization                               | **O(n)**                                      | **O(n)**
  Removal of **m** characters                  | **O(n)**                                      | **O(m)**
  Insertion of **m** characters                | **O(n)**                                      | **O(m)**
  Random access                                | **O(1)**                                      | **O(log n)**
  Concatenation of a string with length **m**  | Best Case **O(1)** / Worst Case **O(n+m)** \* | **O(1)**
  Extraction of substring with length **m**    | **O(m)**                                      | **O(m)**

  \* Most JavaScript engines have certain optimizations in place for concatenating strings.

  The Rope data structure really shines in outperforming regular JS strings when ***m <<< n***. It's therefore best suited for
  applications that perform small, but very frequent operations in very large strings. (e.g. text editors)

## Installation

  Install with [component(1)](http://component.io):

    $ component install component/rope

## API

### var r = rope(str);

Creates a `Rope` data structure, and initializes it with the string `str`.

### Rope#toString()

Converts the entire rope to a JavaScript String.

### Rope#remove(start, end)

Removes characters from `start` to `end`. This operation modifies the rope data structure.

The character at `start` is removed, but the character at `end` is not removed.

### Rope#insert(position, text)

Inserts `text` at `position`.

### Rope#length

Total length of the rope in characters.

### Rope#rebuild()

Rebuilds the entire rope structure, producing a perfectly balanced binary tree. (Resouce intensive operation)

### Rope#rebalance()

Walks on rope structure, finding unbalanced nodes and rebuilding them. (This is usually a less resouce intensive operation than `Rope#rebuild()`, but is still resource intensive.)

### Rope#substring()

Returns text from the rope between the `start` and `end` positions. The character at `start` gets returned, but the character at `end` is not returned.

### Rope#substr()

Returns a string of `length` characters from the rope, starting at the `start` position.

### Rope.SPLIT_LENGTH

The threshold used to split a leaf node into two child nodes.

### Rope.JOIN_LENGTH

The threshold used to join two child nodes into one leaf node.

### Rope.REBALANCE_RATIO

The threshold used to trigger a tree node rebuild when rebalancing the rope.

## License

  The MIT License (MIT)

  Copyright (c) 2014 Automattic, Inc.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
