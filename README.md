# TaffyDB (taffy.js)

TaffyDB is an open source JavaScript library that provides powerful
in-memory database capabilities to both browser and server applications.

## Introduction

Have you ever noticed how JavaScript object literals look a lot like
records? And that if you wrap a group of them up in an array you have
something that looks a lot like a database table?  We did too. 
We created TaffyDB easily and efficiently manipulate these 'tables'  
with a uniform and familiar SQL-like interface.

We use TaffyDB instead of ad-hoc data manipulation routines throughout 
our applications. This reduces development time, improves performance,
simplifies maintenance, *and* increases quality.

Please see the [official website](http://www.taffydb.com) for more 
complete documentation.

## What makes it sticky

 - Extremely fast
 - Powerful JavaScript-centric data selection engine
 - SQL inspired features such as insert, update, unique, count, and more
 - Robust cross browser support 
 - Easily extended with your own functions
 - Compatible with any DOM library (jQuery, YUI, Dojo, etc)

TaffyDB is compatible with all modern browsers: IE9+, FF3+, Safari 5+, 
and Chrome 1.0+.  It also works in NodeJS 0.10+.

## Create a DB
Just pass in a JSON array:

```js
var product_db = TAFFY([
  { "item"  : 1,
    "name"  : "Blue Ray Player",
    "price" : 99.99
  },
  { "item"  : 2,
    "name"  : "3D TV",
    "price" : 1799.99
  }
]);
```

## Example queries

```js
// where item is equal to 1
var item1 = products({item:1});

// where price is less than 100
var lowPricedItems = products({price:{lt:100}});

// where name is like "Blue Ray"
var blueRayPlayers = products({name:{like:"Blue Ray"}});

// get first record
products().first();

// get last record
products().last();
```

## Example record manipulation

```js
// update the price of the Blue Ray Player to 89.99
products({item:1}).update({price:89.99});

// loop over the records and call a function
products().each(function (r) {alert(r.name)});

// sort the records by price descending
products.sort("price desc");

// select only the item names into an array
products().select("name"); // returns ["3D TV","Blue Ray Player"]

// Inject values from a record into a string template.
// Row value will be set to "<tr><td>3D TV</td><td>17999.99</td></tr>"
var row = products({item:2})
  .supplant("<tr><td>{name}</td><td>{price}</td></tr>");
```

## Use it in Node.JS
Node is easy to use in Node.JS.  Simply install using `npm` and `require` the
package:

```js
$ npm install --production taffy

# and then in your code
TAFFY = require( 'taffy' ).taffy;
```

The automated regression test file `nodeunit_suite.js` is an excellent
example.

## Help improve taffydb

TaffyDB has been used and refined for years for numerous production tools and
commercial products.  It is therefore is quite stable and reliable.  However,
we want expand our regression test coverage so we can easily improve the code
with the confidence that we are unlikely to break exising capabilities.

### Getting started with development

Run the `install_dev.sh` script to install development utilities such as `jslint`,
`nodeunit`, and `uglifyjs` to the `bin` directory.

```js
./install_dev.sh
```


### Running regression tests
Running the nodeunit regression test suite is simple:

```js
cd taffydb
./install_dev.sh # as above

bin/nodeunit ./nodeunit_suite.js
```

Please do not send a pull request unless your changes have passed these
tests.  We check, you know :)

### Adding to regression tests
We wish to substantially expand the number of tests, and your
help is welcome!  The code, `nodeunit_suite.js`, should be easy to adjust.
Pull requests that include regression test inclusions are very much
appreciated.  Alternately, if you just send along a test scenario, we'd be
happy to include it in the suite, time permitting.

## Documentation, support, updates
View more docs and examples, get support, and get notified of updates:

Web: http://taffydb.com
Twitter: http://twitter.com/biastoact 

## Software License Agreement (BSD License)
Copyright (c)
All rights reserved.


Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
