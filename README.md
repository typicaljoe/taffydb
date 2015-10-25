# TaffyDB (taffy.js) - mmikowski fork

TaffyDB is an opensouce library that brings database features 
into your JavaScript applications.

## New versions

### 2.x.0
- Adjusted to pass jslint and employ some best practice

## 2.x.1 - updated regression tests, ported iOS9 fix from
- Updated tests to check for regressions
- Made tests easy to expand
- Added iOS9 fixes per https://github.com/typicaljoe/taffydb/pull/101/files

## Introduction

TaffyDB brings powerful SQL-like database capabilities to JavaScript,
and can greatly improve the way you with with data in your applications.
It can also greatly reduce development time and improve the speed and 
quality of your code.

How you ever noticed how JavaScript object literals look a lot like
records? And that if you wrap a group of them up in an array you have
something that acts a lot like a database table?  We did too, and 
TaffyDB provides you with a rich set of tools to manipulate lists of
objects with a fast, uniform API.

## What makes it sticky

 - Extremely fast
 - Powerful JavaScript centric data selection engine
 - Database inspired features such as insert, update, unique, count, etc
 - Robust cross browser support
 - Easily extended with your own functions
 - Compatible with any DOM library (jQuery, YUI, Dojo, etc)

## Create a DB
Just pass in a JSON array:

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

## Example queries

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

## Example record manipulation

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
    var row = products({item:2}).supplant("<tr><td>{name}</td><td>{price}</td></tr>");

## Use it in Node.JS
Node is easy to use in Node.JS.  Simply install using `npm` and `require` the
package:

    TAFFY = require( 'taffy' ).taffy;

The automated regression test file `nodeunit_suite.js` is an excellent
example.

## Automated regression tests

### Purpose
TaffyDB has been used and refined for years for numerous production tools and
commercial products.  It is therefore is quite stable and reliable.  However,
we want expand our regression test coverage so we can easily improve the code
with the confidence that we are unlikely to break exising capabilities.

### Running the tests
Running the nodeunit suite is simple:

    cd taffydb
    install_dev.sh # this installs development dependencies
    bin/nodeunit ./nodeunit_suite.js

### Help us out!
If you want to help with taffydb development, run the `install_dev.sh`
script to install development utilities such as jslint, nodeunit, and
uglifyjs to the `bin` directory.

We wish to substantially expand the number of tests, and your
help is certainly welcome!  The nodeunit code is quite easy to adjust, so if
you want to provide a pull request for a change, that would be welcome.
Alternately, if you just send along the code for a test scenario, we'd be
happy to include it in the suite.

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
