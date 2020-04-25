---
template: overrides/main.html
---

# CodeHilite

[CodeHilite][1] is an extension that adds syntax highlighting to code blocks
and is included in the standard Markdown library. It uses [Pygments][2] during
the compilation of the Markdown file to provide syntax highlighting for over 
[300 languages][3] and has no JavaScript runtime dependency.

  [1]: https://python-markdown.github.io/extensions/code_hilite/
  [2]: https://pygments.org
  [3]: http://pygments.org/languages

## Configuration

Add the following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - codehilite
```

## Usage

### Specifying the language

The CodeHilite extension uses the same syntax as regular Markdown code blocks,
but needs to know the language of the code block. This can be done in three
different ways.

#### via Markdown syntax <small>recommended</small>

In Markdown, code blocks can be opened and closed by writing three backticks on
separate lines. To add code highlighting to those blocks, the easiest way is
to specify the language identifier directly after the opening block.

Example:

```` markdown
``` python
import tensorflow as tf
```
````

Result:

``` python
import tensorflow as tf
```

#### via Shebang

Alternatively, if the first line of a code block contains a shebang, the
language is derived from the path referenced in the shebang. This will only
work for code blocks that are indented using four spaces, not for those
encapsulated in three backticks.

Example:

```` markdown
    #!/usr/bin/python
    import tensorflow as tf
````

Result:

``` python
#!/usr/bin/python
import tensorflow as tf
```

#### via three colons

If the first line starts with three colons followed by a language identifier,
the first line is stripped. This will only work for code blocks that are
indented using four spaces, not for those encapsulated in three backticks.

Example:

``` markdown
    :::python
    import tensorflow as tf
```

Result:

    :::python
    import tensorflow as tf

### Adding line numbers

Line numbers can be added to a code block by enabling the `linenums` flag in
`mkdocs.yml` or adding `linenums=1` right after the language identifier:

``` yaml
markdown_extensions:
  - codehilite:
      linenums: true
```

Example:

```` markdown
``` python linenums="1"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

Result:

``` python linenums="1"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

### Grouping code blocks

The [Tabbed][4] extension which is part of the [PyMdown Extensions][5]
package adds support for grouping Markdown blocks with tabs. This is especially
useful for documenting projects with multiple language bindings.

Example:

````
=== "Bash"
    ``` bash
    #!/bin/bash

    echo "Hello world!"
    ```

=== "C"
    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"
    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

=== "C#"
    ``` c#
    using System;

    class Program {
      static void Main(string[] args) {
        Console.WriteLine("Hello world!");
      }
    }
    ```
````

Result:

=== "Bash"
    ``` bash
    #!/bin/bash

    echo "Hello world!"
    ```

=== "C"
    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"
    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

=== "C#"
    ``` c#
    using System;

    class Program {
      static void Main(string[] args) {
        Console.WriteLine("Hello world!");
      }
    }
    ```

  [4]: https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/
  [5]: https://facelessuser.github.io/pymdown-extensions

### Highlighting specific lines

Specific lines can be highlighted by passing the line numbers to the `hl_lines`
argument placed right after the language identifier. Line counts start at 1.

Example:

```` markdown
``` python hl_lines="3 4"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

Result:

``` python linenums="1" hl_lines="3 4"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

## Supported languages <small>excerpt</small>

CodeHilite uses [Pygments][2], a generic syntax highlighter with support for
over [300 languages][3], so the following list of examples is just an excerpt.

### Bash

``` bash
#!/bin/bash

for OPT in "$@"
do
  case "$OPT" in
    '-f' )  canonicalize=1 ;;
    '-n' )  switchlf="-n" ;;
  esac
done

# readlink -f
function __readlink_f {
  target="$1"
  while test -n "$target"; do
    filepath="$target"
    cd `dirname "$filepath"`
    target=`readlink "$filepath"`
  done
  /bin/echo $switchlf `pwd -P`/`basename "$filepath"`
}

if [ ! "$canonicalize" ]; then
  readlink $switchlf "$@"
else
  for file in "$@"
  do
    case "$file" in
      -* )  ;;
      *  )  __readlink_f "$file" ;;
    esac
    done
fi

exit $?
```

### C

``` c
extern size_t
pb_varint_scan(const uint8_t data[], size_t left) {
  assert(data && left);
  left = left > 10 ? 10 : left;

#ifdef __SSE2__

  /* Mapping: remaining bytes ==> bitmask */
  static const int mask_map[] = {
    0x0000, 0x0001, 0x0003, 0x0007,
    0x000F, 0x001F, 0x003F, 0x007F,
    0x00FF, 0x01FF, 0x03FF
  };

  /* Load buffer into 128-bit integer and create high-bit mask */
  __m128i temp = _mm_loadu_si128((const __m128i *)data);
  __m128i high = _mm_set1_epi8(0x80);

  /* Intersect and extract mask with high-bits set */
  int mask = _mm_movemask_epi8(_mm_and_si128(temp, high));
  mask = (mask & mask_map[left]) ^ mask_map[left];

  /* Count trailing zeroes */
  return mask ? __builtin_ctz(mask) + 1 : 0;

#else

  /* Linear scan */
  size_t size = 0;
  while (data[size++] & 0x80)
    if (!--left)
      return 0;
  return size;

#endif /* __SSE2__ */

}
```

### C++

``` cpp
Extension::
Extension(const Descriptor *descriptor, const Descriptor *scope) :
    descriptor_(descriptor),
    scope_(scope) {

  /* Extract full name for signature */
  variables_["signature"] = descriptor_->full_name();

  /* Prepare message symbol */
  variables_["message"] = StringReplace(
    variables_["signature"], ".", "_", true);
  LowerString(&(variables_["message"]));

  /* Suffix scope to identifiers, if given */
  string suffix ("");
  if (scope_) {
    suffix = scope_->full_name();

    /* Check if the base and extension types are in the same package */
    if (!scope_->file()->package().compare(descriptor_->file()->package()))
      suffix = StripPrefixString(suffix,
        scope_->file()->package() + ".");

    /* Append to signature */
    variables_["signature"] += ".[" + suffix +"]";
    suffix = "_" + suffix;
  }

  /* Prepare extension symbol */
  variables_["extension"] = StringReplace(
    suffix, ".", "_", true);
  LowerString(&(variables_["extension"]));
}
```

### C&#35;

``` csharp
public static void Send(
    Socket socket, byte[] buffer, int offset, int size, int timeout) {
  int startTickCount = Environment.TickCount;
  int sent = 0;
  do {
    if (Environment.TickCount > startTickCount + timeout)
      throw new Exception("Timeout.");
    try {
      sent += socket.Send(buffer, offset + sent,
        size - sent, SocketFlags.None);
    } catch (SocketException ex) {
      if (ex.SocketErrorCode == SocketError.WouldBlock ||
          ex.SocketErrorCode == SocketError.IOPending ||
          ex.SocketErrorCode == SocketError.NoBufferSpaceAvailable) {
        /* Socket buffer is probably full, wait and try again */
        Thread.Sleep(30);
      } else {
        throw ex;
      }
    }
  } while (sent < size);
}
```

### Clojure

``` clojure
(clojure-version)

(defn partition-when
  [f]
  (fn [rf]
    (let [a (java.util.ArrayList.)
          fval (volatile! false)]
      (fn
        ([] (rf))
        ([result]
           (let [result (if (.isEmpty a)
                          result
                          (let [v (vec (.toArray a))]
                            ;; Clear first
                            (.clear a)
                            (unreduced (rf result v))))]
             (rf result)))
        ([result input]
            (if-not (and (f input)  @fval)
               (do
                 (vreset! fval true)
                 (.add a input)
                 result)
               (let [v (vec (.toArray a))]
                 (.clear a)
                 (let [ret (rf result v)]
                   (when-not (reduced? ret)
                     (.add a input))
                   ret))))))))


(into [] (partition-when
          #(.startsWith % ">>"))
          ["1d" "33" ">> 1" ">> 2" "22" ">> 3"])
```

### Diff

``` diff
Index: grunt.js
===================================================================
--- grunt.js	(revision 31200)
+++ grunt.js	(working copy)
@@ -12,6 +12,7 @@

 module.exports = function (grunt) {

+  console.log('hello world');
   // Project configuration.
   grunt.initConfig({
     lint: {
@@ -19,10 +20,6 @@
         'packages/services.web/{!(test)/**/,}*.js',
         'packages/error/**/*.js'
       ],
-      scripts: [
-        'grunt.js',
-        'db/**/*.js'
-      ],
       browser: [
         'packages/web/server.js',
         'packages/web/server/**/*.js',
```

### Docker

``` docker
FROM ubuntu

# Install vnc, xvfb in order to create a 'fake' display and firefox
RUN apt-get update && apt-get install -y x11vnc xvfb firefox
RUN mkdir ~/.vnc

# Setup a password
RUN x11vnc -storepasswd 1234 ~/.vnc/passwd

# Autostart firefox (might not be the best way, but it does the trick)
RUN bash -c 'echo "firefox" >> /.bashrc'

EXPOSE 5900
CMD ["x11vnc", "-forever", "-usepw", "-create"]
```

### Elixir

``` elixir
require Logger

def accept(port) do
  {:ok, socket} = :gen_tcp.listen(port,
                    [:binary, packet: :line, active: false, reuseaddr: true])
  Logger.info "Accepting connections on port #{port}"
  loop_acceptor(socket)
end

defp loop_acceptor(socket) do
  {:ok, client} = :gen_tcp.accept(socket)
  serve(client)
  loop_acceptor(socket)
end

defp serve(socket) do
  socket
  |> read_line()
  |> write_line(socket)

  serve(socket)
end

defp read_line(socket) do
  {:ok, data} = :gen_tcp.recv(socket, 0)
  data
end

defp write_line(line, socket) do
  :gen_tcp.send(socket, line)
end
```

### Erlang

``` erlang
circular(Defs) ->
  [ { { Type, Base }, Fields } ||
    { { Type, Base }, Fields } <- Defs, Type == msg, circular(Base, Defs) ].

circular(Base, Defs) ->
  Fields = proplists:get_value({ msg, Base }, Defs),
  circular(Defs, Fields, [Base]).

circular(_Defs, [], _Path) ->
  false;
circular(Defs, [Field | Fields], Path) ->
  case Field#field.type of
    { msg, Type } ->
      case lists:member(Type, Path) of
        false ->
          Children = proplists:get_value({ msg, Type }, Defs),
          case circular(Defs, Children, [Type | Path]) of
            false -> circular(Defs, Fields, Path);
            true  -> true
          end;
        true ->
          Type == lists:last(Path) andalso
            (length(Path) == 1 orelse not is_tree(Path))
      end;
    _ ->
      circular(Defs, Fields, Path)
  end.
```

### F&#35;

``` fsharp
/// Asynchronously download retangles from the server
/// and decode the JSON format to F# Rectangle record
let [<Js>] getRectangles () : Async<Rectangle[]> = async {
  let req = XMLHttpRequest()
  req.Open("POST", "/get", true)
  let! resp = req.AsyncSend()
  return JSON.parse(resp) }

/// Repeatedly update rectangles after 0.5 sec
let [<Js>] updateLoop () = async {
  while true do
    do! Async.Sleep(500)
    let! rects = getRectangles()
    cleanRectangles()
    rects |> Array.iter createRectangle }
```

### Go

``` go
package main

import "fmt"

func counter(id int, channel chan int, closer bool) {
  for i := 0; i < 10000000; i++ {
    fmt.Println("process", id," send", i)
    channel <- 1
  }
  if closer { close(channel ) }
}

func main() {
  channel := make(chan int)
  go counter(1, channel, false)
  go counter(2, channel, true)

  x := 0

  // receiving data from channel
  for i := range channel {
    fmt.Println("receiving")
    x += i
  }

  fmt.Println(x)
}
```

### HTML

``` html
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>HTML5 Boilerplate</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="js/vendor/modernizr-2.8.3.min.js"></script>
  </head>
  <body>
    <p>Hello world! This is HTML5 Boilerplate.</p>
  </body>
</html>
```

### Java

``` java
import java.util.LinkedList;
import java.lang.reflect.Array;

public class UnsortedHashSet<E> {

  private static final double LOAD_FACTOR_LIMIT = 0.7;

  private int size;
  private LinkedList<E>[] con;

  public UnsortedHashSet() {
    con  = (LinkedList<E>[])(new LinkedList[10]);
  }

  public boolean add(E obj) {
    int oldSize = size;
    int index = Math.abs(obj.hashCode()) % con.length;
    if (con[index] == null)
      con[index] = new LinkedList<E>();
    if (!con[index].contains(obj)) {
      con[index].add(obj);
      size++;
    }
    if (1.0 * size / con.length > LOAD_FACTOR_LIMIT)
      resize();
    return oldSize != size;
  }

  private void resize() {
    UnsortedHashSet<E> temp = new UnsortedHashSet<E>();
    temp.con = (LinkedList<E>[])(new LinkedList[con.length * 2 + 1]);
    for (int i = 0; i < con.length; i++) {
      if (con[i] != null)
        for (E e : con[i])
          temp.add(e);
    }
    con = temp.con;
  }

  public int size() {
    return size;
  }
}
```

### JavaScript

``` javascript
var Math = require('lib/math');

var _extends = function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }

  return target;
};

var e = exports.e = 2.71828182846;
exports['default'] = function (x) {
  return Math.exp(x);
};

module.exports = _extends(exports['default'], exports);
```

### JSON

``` json
{
  "name": "mkdocs-material",
  "version": "0.2.4",
  "description": "A Material Design theme for MkDocs",
  "homepage": "http://squidfunk.github.io/mkdocs-material/",
  "authors": [
    "squidfunk <martin.donath@squidfunk.com>"
  ],
  "license": "MIT",
  "main": "Gulpfile.js",
  "scripts": {
    "start": "./node_modules/.bin/gulp watch --mkdocs",
    "build": "./node_modules/.bin/gulp build --production"
  }
  ...
}
```

### Julia

``` julia
using MXNet

mlp = @mx.chain mx.Variable(:data)             =>
  mx.FullyConnected(name=:fc1, num_hidden=128) =>
  mx.Activation(name=:relu1, act_type=:relu)   =>
  mx.FullyConnected(name=:fc2, num_hidden=64)  =>
  mx.Activation(name=:relu2, act_type=:relu)   =>
  mx.FullyConnected(name=:fc3, num_hidden=10)  =>
  mx.SoftmaxOutput(name=:softmax)

# data provider
batch_size = 100
include(Pkg.dir("MXNet", "examples", "mnist", "mnist-data.jl"))
train_provider, eval_provider = get_mnist_providers(batch_size)

# setup model
model = mx.FeedForward(mlp, context=mx.cpu())

# optimization algorithm
optimizer = mx.SGD(lr=0.1, momentum=0.9)

# fit parameters
mx.fit(model, optimizer, train_provider, n_epoch=20, eval_data=eval_provider)
```

### Lua

``` lua
local ffi = require("ffi")

ffi.cdef[[
  void Sleep(int ms);
  int poll(struct pollfd *fds, unsigned long nfds, int timeout);
]]

local sleep
if ffi.os == "Windows" then
  function sleep(s)
    ffi.C.Sleep(s*1000)
  end
else
  function sleep(s)
    ffi.C.poll(nil, 0, s * 1000)
  end
end

for i = 1,160 do
  io.write("."); io.flush()
  sleep(0.01)
end
io.write("\n")
```

### MySQL

``` mysql
SELECT
  Employees.EmployeeID,
  Employees.Name,
  Employees.Salary,
  Manager.Name AS Manager
FROM
  Employees
LEFT JOIN
  Employees AS Manager
ON
  Employees.ManagerID = Manager.EmployeeID
WHERE
  Employees.EmployeeID = '087652';
```

### PHP

``` php
<?php

// src/AppBundle/Controller/LuckyController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class LuckyController {

  /**
   * @Route("/lucky/number")
   */
  public function numberAction() {
    $number = mt_rand(0, 100);

    return new Response(
      '<html><body>Lucky number: '.$number.'</body></html>'
    );
  }
}
```

### Protocol Buffers

``` proto
syntax = "proto2";

package caffe;

// Specifies the shape (dimensions) of a Blob.
message BlobShape {
  repeated int64 dim = 1 [packed = true];
}

message BlobProto {
  optional BlobShape shape = 7;
  repeated float data = 5 [packed = true];
  repeated float diff = 6 [packed = true];

  // 4D dimensions -- deprecated.  Use "shape" instead.
  optional int32 num = 1 [default = 0];
  optional int32 channels = 2 [default = 0];
  optional int32 height = 3 [default = 0];
  optional int32 width = 4 [default = 0];
}
```

### Python

``` python

"""
  A very simple MNIST classifier.
  See extensive documentation at
  http://tensorflow.org/tutorials/mnist/beginners/index.md
"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

# Import data
from tensorflow.examples.tutorials.mnist import input_data

import tensorflow as tf

flags = tf.app.flags
FLAGS = flags.FLAGS
flags.DEFINE_string('data_dir', '/tmp/data/', 'Directory for storing data')

mnist = input_data.read_data_sets(FLAGS.data_dir, one_hot=True)

sess = tf.InteractiveSession()

# Create the model
x = tf.placeholder(tf.float32, [None, 784])
W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))
y = tf.nn.softmax(tf.matmul(x, W) + b)
```

### Ruby

``` ruby
require 'finity/event'
require 'finity/machine'
require 'finity/state'
require 'finity/transition'
require 'finity/version'

module Finity
  class InvalidCallback < StandardError; end
  class MissingCallback < StandardError; end
  class InvalidState    < StandardError; end

  # Class methods to be injected into the including class upon inclusion.
  module ClassMethods

    # Instantiate a new state machine for the including class by accepting a
    # block with state and event (and subsequent transition) definitions.
    def finity options = {}, &block
      @finity ||= Machine.new self, options, &block
    end

    # Return the names of all registered states.
    def states
      @finity.states.map { |name, _| name }
    end

    # Return the names of all registered events.
    def events
      @finity.events.map { |name, _| name }
    end
  end

  # Inject methods into the including class upon inclusion.
  def self.included base
    base.extend ClassMethods
  end
end
```

### Scala

```scala
// Every record of this DataFrame contains the label and
// features represented by a vector.
val df = sqlContext.createDataFrame(data).toDF("label", "features")

// Set parameters for the algorithm.
// Here, we limit the number of iterations to 10.
val lr = new LogisticRegression().setMaxIter(10)

// Fit the model to the data.
val model = lr.fit(df)

// Inspect the model: get the feature weights.
val weights = model.weights

// Given a dataset, predict each point's label, and show the results.
model.transform(df).show()g
```

### XML

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mainTag SYSTEM "some.dtd" [ENTITY % entity]>
<?oxygen RNGSchema="some.rng" type="xml"?>
<xs:main-Tag xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <!-- This is a sample comment -->
  <childTag attribute="Quoted Value" another-attribute='Single quoted value'
      a-third-attribute='123'>
    <withTextContent>Some text content</withTextContent>
    <withEntityContent>Some text content with &lt;entities&gt; and
      mentioning uint8_t and int32_t</withEntityContent>
    <otherTag attribute='Single quoted Value'/>
  </childTag>
  <![CDATA[ some CData ]]>
</main-Tag>
```
