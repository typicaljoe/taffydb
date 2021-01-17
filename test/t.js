/*jslint              node : true,   continue : true,
    devel : true,   indent : 2,        maxerr : 50,
   newcap : true,    nomen : true,   plusplus : true,
   regexp : true,     vars : false,     white : true
  unparam : true,   sloppy : true,       todo : true
*/
/*global global, module, require, $, KI, document, window */
// global global, module, require, $, KI, document, window

  'use strict';
  // BEGIN module-scope vars
  var
    TAFFY = require( '../taffy.js' ).taffy,

    // Load libraries
    // Declare data sources
    cfgMap = {
      friend_list : [
        {"id":1,"gender":"M","first":"John","last":"Smith",
          "city":"Seattle, WA","status":"Active"},
        {"id":2,"gender":"F","first":"Kelly","last":"Ruth",
          "city":"Dallas, TX","status":"Active"},
        {"id":3,"gender":"M","first":"Jeff","last":"Stevenson",
          "city":"Washington, D.C.","status":"Active"},
        {"id":4,"gender":"F","first":"Jennifer","last":"Gill",
          "city":"Seattle, WA","status":"Active"}
      ],
      nested_list : [
        {"id":1,"nested":{"a":1,"b":2,"c":3}},
        {"id":2,"nested":{"a":1,"b":11,"c":111}},
        {"id":3,"nested":{"a":8,"b":16,"c":32}},
        {"id":4,"un":{"even":{"nest":{"ing":10},"x":20},"y":30}},
        {"id":5,"un":{"even":{"nest":{"ing":10},"x":9},"y":8}},
        {"id":6,"un":{"even":{"nest":{"ing":0},"x":20},"y":30}},
        {"id":7,"outbox":["a","b","c"],"wrap":{"foam":{"inbox":["a","b","c"]}}},
        {"id":8,"outbox":["a","b"],"wrap":{"foam":{"inbox":["a","b"]}}},
        {"id":9,"root":{"branch1":{"leaf1":1,"leaf2":2},
          "branch2":{"leaf1":[1,2,3],"leaf2":[4,5,6]}}},
        {"id":10,"root":{"branch1":{"leaf1":1,"leaf2":23},
          "branch2":{"leaf1":[1,3],"leaf2":[4,6,8]}}},
        {"id":11,"root":{"branch1":{"leaf1":2,"leaf2":3},
          "branch2":{"leaf1":[1,2,3],"leaf2":[4,6,8]}}}
      ]
    },
    // Declare utlities
    getVarType, cloneFriendList,
    // Declare init used to reset state for tests

    // Declare tests
    testSmoke, testShowBug, testNested, testDummy
    ;
  // END module-scope vars

  // BEGIN public utility /getVarType/
  // Returns 'Function', 'Object', 'Array',
  // 'String', 'Number', 'Boolean', or 'Undefined',
  getVarType = function ( data ) {
    if (undefined === data ){ return 'Undefined'; }
    if (data === null ){ return 'Null'; }
    return {}.toString.call(data).slice(8, -1);
  };
  // END public utility /getVarType/

  // BEGIN cloneFriendList
  cloneFriendList = function () { return cfgMap.friend_list.slice(); };
  // END cloneFriendList

  // BEGIN testSmoke
  testSmoke = function ( test_obj ) {
    var
      friend_db, query_list, query_count, initial_list, expect_map,
      idx, bit_list, key_name, val_data, expect_data, actual_str, msg_str,

      partial, chain_list, chain_count, i, chain_map
      ;

    friend_db = TAFFY( cloneFriendList() );


    // Fast clone; see stackoverflow.com/questions/122102/5344074
    initial_list = JSON.parse(JSON.stringify(friend_db().get()));

    // query data
    //
    query_list = [
      [ 'filter_city',      [ { city : "Seattle, WA"}, { key: 'get' } ] ],
      [ 'filter_id_num',    [ { id : 1 }, { key : 'get' }             ] ],
      [ 'filter_id_str',    [ { id : '1'}, { key : 'get' }            ] ],
      [ 'filter_name',      [ { first : 'John', last : 'Smith' }, { key : 'get' } ] ],
      [ 'kelly_by_id',      [ { id : 2}, { key : 'first' } ] ],
      [ 'kelly_last_name',  [ { id : 2}, { key : 'first' }, { _xprop : 'last' } ] ],
      [ 'id_list',          [ null, { key : 'select', val : 'id' } ] ],
      [ 'city_list',        [ null, { key : 'distinct', val : 'city' } ] ],
      [ 'filter_001',       [ null, { key : 'filter', val : { city : "Seattle, WA"} }, { key : 'get' } ] ],

      // should match initial order
      [ 'order_001',        [ null, { key : 'get' } ] ],
      [ 'order_002',        [ null, { key : 'order', val : 'gender' }, { key : 'get' } ] ],
      [ 'order_003',        [ null, { key : 'order', val : 'gender desc' }, { key : 'get' } ] ],
      [ 'order_004',        [ null, { key : 'order', val : 'gender, last' }, { key : 'get' } ] ],
      [ 'order_005',        [ null, { key : 'order', val : 'gender desc, last desc' }, { key : 'get' } ] ],
      // TODO: asec is not really supported, but is default sort.
      // Also should the abbreviation be 'asc' or similar?
      [ 'order_006',        [ null, { key : 'order', val : 'first' }, { key : 'get' } ] ],
      [ 'order_007',        [ null, { key : 'order', val : 'last' },  { key : 'get' } ] ],
      [ 'order_008',        [ null, { key : 'order', val : 'first desc' }, { key : 'get' } ] ],
      [ 'order_009',        [ null, { key : 'order', val : 'last desc' },  { key : 'get' } ] ],
      // should match initial order
      [ 'order_001',        [ null, { key : 'get' } ] ],
      [ 'sort_001_002',     [ { _xsort : 'last' }, { key : 'get' }    ] ],
      // should match changed order
      [ 'sort_001_002',     [ null, { key : 'get'}  ] ],
      [ 'get_ruth',         [ { "last" : "Ruth" }, { key : 'update', val : { first : 'KelBel' } }, { key : 'first' } ] ]
    ];

    query_count = query_list.length;
    test_obj.expect( query_count );

    expect_map = {
      filter_city     : [{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}],
      filter_id_num   : [{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true}],
      filter_id_str   : [],
      filter_name     : [{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true}],
      kelly_by_id     : {"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},
      kelly_last_name : 'Ruth',
      id_list         : [1,2,3,4],
      city_list       : ["Seattle, WA","Dallas, TX","Washington, D.C."],
      filter_001      : [{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}],
      order_001       :  initial_list,
      order_002       :  [{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true}],
      order_003       : [{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}],
      order_004       :  [{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true}],
      order_005       :  [{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}],
      order_006       :  [{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true}],
      order_007       :  [{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true}],
      order_008       :  [{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true},{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true}],
      order_009       :  [{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}],
      order_010       :  initial_list,
      sort_001_002    :  [{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true},{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true},{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active","___id":"T000002R000004","___s":true}],
      get_ruth : {"id":2,"gender":"F","first":"KelBel","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true}
    };

    for ( idx = 0; idx < query_count; idx++ ) {
      bit_list    = query_list[ idx ];
      key_name    = bit_list[ 0 ];
      val_data    = bit_list[ 1 ];
      expect_data = expect_map[ key_name ] || '';


      chain_list  = val_data;
      chain_count = chain_list.length;

      _PARTIAL_:
      for ( i = 0; i < chain_count; i++ ) {
        chain_map = chain_list[ i ];

        if ( i === 0 ) {
          if ( ! chain_map ) {
            partial = friend_db();
          }
          else if ( chain_map._xsort ) {
            friend_db.sort( chain_map._xsort );
            partial = friend_db();
          }
          else {
            partial = friend_db( chain_map );
          }
        }

        else {
          if ( chain_map._xprop ) {
            partial = partial[ chain_map._xprop ];
          }
          else if ( chain_map.val ) {
            partial = partial[ chain_map.key ]( chain_map.val );
          }
          else {
            partial = partial[ chain_map.key ]();
          }
        }
      }

      actual_str = JSON.stringify( partial );
      msg_str = actual_str + ' === ' + JSON.stringify( expect_data );
      test_obj.deepEqual( partial, expect_data, msg_str );
    }
    test_obj.done();
  };
  // END testSmoke

  // BEGIN testShowBug
  testShowBug = function ( test_obj ) {
    var friend_db = TAFFY( cloneFriendList() );
    test_obj.expect( 0 );

    friend_db().each(function ( row_map, idx ) {
      if ( row_map.city === 'Seattle, WA' ){
        row_map.city = 'WallaWalla, WA';
      }
    });

    // console.log( 'Example filter bug - rows changed without using '
    //   + '.update() will filter by their original values. '
    // );
    // console.log( 'We expect 0 rows, but get 2... ' );
    // console.log(
    //   friend_db().filter({ city : 'Seattle, WA'}).get()
    // );
    // console.log( '...even though the city has changed in the collection.' );
    // console.log( friend_db().get() );
    // console.log( '' );
    //
    // console.log( 'Example filter when .update() is used.');
    // friend_db = TAFFY( cloneFriendList() );
    //
    // friend_db({ city : 'Seattle, WA' })
    //   .update({ city : 'WallaWalla, WA' });
    //
    // console.log( 'now we get the correct response (0 rows) ...' );
    // console.log(
    //   friend_db().filter({ city : 'Seattle, WA'}).get()
    // );
    // console.log( friend_db().get() );
    // console.log( '... that reflects the taffy collection.' );

    test_obj.done();
  };
  // END testShowBug

  // BEGIN testNested
  testNested = function ( test_obj ) {
    var nested_db, records, runTests, qtests, nqtests, i, actualData,
      expectedData, msg;

    nested_db = TAFFY( cfgMap.nested_list );
    records = nested_db().get();

    runTests = function ( tests ) {
      for ( i = 0; i < tests.length; i++ ) {
        actualData = nested_db( tests[i].query ).get();
        expectedData = tests[i].expected;
        msg = JSON.stringify( actualData ) + '==='
          + JSON.stringify( expectedData );

        test_obj.deepEqual( actualData, expectedData, msg );
      }
    };

    qtests = [
      {
        query: { id: { '!is': 2 }, nested: { a: 1 } },
        expected: [records[0]]
      },
      {
        query: { nested: { a: 1, b: 11, c: 111 } },
        expected: [records[1]]
      },
      {
        query: { nested: { a: {lt: 8} } },
        expected: []
      },
      {
        query: { id: 11, root: { branch1: { leaf1: 2, leaf2: 3 } } },
        expected: []
      }
    ];

    nqtests = [
      {
        query: { id: { '!is': 2 }, nested: { a: 1 } },
        expected: [records[0]]
      },
      {
        query: { nested: { a: 1, b: 11, c: 111 } },
        expected: [records[1]]
      },
      {
        query: { nested: { a: {lt: 8} } },
        expected: [records[0], records[1]]
      },
      {
        query: { nested: { a: {lt: 8}, b: {gt: 2} } },
        expected: [records[1]]
      },
      {
        query: { nested: { b: [2, 16] } },
        expected: [records[0], records[2]]
      },
      {
        query: { un: { even: { nest: { ing: { gt: 9 } } } } },
        expected: [records[3], records[4]]
      },
      {
        query: { un: { even: { nest: { ing: { gt: 9 } }, x: [9, 20] } } },
        expected: [records[3], records[4]]
      },
      {
        query: { un: { even: { nest: { ing: { lt: 9 } } }, y: { gte: 30 } } },
        expected: [records[5]]
      },
      {
        query: { un: { even : { nest : { ing : 10 }, x : 20 }, y : 30 } },
        expected: [records[3]]
      },
      {
        query: {
          un: { even: { nest: { ing: { '!is': 0 } },
                        x: { '!==': 9 } },
                y: { gte: 30 } }
        },
        expected: [records[3]]
      },
      {
        query: { outbox: { hasAll: ['a', 'b', 'c'] } },
        expected: [records[6]]
      },
      {
        query: { wrap: { foam: { inbox: { has: [ 'a','b','c' ] } } } },
        expected: [records[6], records[7]]
      },
      {
        query: { wrap: { foam: { inbox: { hasAll: [ 'a','b','c' ] } } } },
        expected: [records[6]]
      },
      {
        query: { outbox: { hasAll: ['a', 'b', 'c'] },
                 wrap: { foam: { inbox: { hasAll: [ 'a','b','c' ] } } } },
        expected: [records[6]]
      },
      {
        query: { root: { branch1: { leaf1: [1, 2], leaf2: [2, 23] } } },
        expected: [records[8], records[9]]
      },
      {
        query: { root: { branch2: { leaf1: { hasAll: [1, 2] },
                                    leaf2: { hasAll: [4, 8] } } } },
        expected: [records[10]]
      },
      {
        query: { root: { branch1: { leaf1: { '!is': 1 },
                                    leaf2: { 'is': 3 } } } },
        expected: [records[10]]
      },
      {
        query: [{ root: { branch1: { leaf1: [1, 2], leaf2: [2, 23] } } },
                { root: { branch1: { leaf1: { '!is': 1 },
                                     leaf2: { 'is': 3 } } } }],
        expected: [records[8], records[9], records[10]]
      },
    ];

    test_obj.expect( qtests.length + nqtests.length + 2 );

    runTests(qtests);
    nested_db.settings({ nested: true });
    runTests(nqtests);

    actualData = nested_db( { root: { branch1: { leaf1: [1, 2] } } },
      { root: { branch1: {leaf2: [2, 23] } } } ).get();
    expectedData = [records[8], records[9]];
    msg = JSON.stringify( actualData ) + '==='
      + JSON.stringify( expectedData );
    test_obj.deepEqual( actualData, expectedData, msg );

    actualData = nested_db().filter( {
      un: { even: { nest: { ing: { gt: 9 } }, x: [9, 20] } }
    } ).get();
    expectedData = [records[3], records[4]];
    msg = JSON.stringify( actualData ) + '==='
      + JSON.stringify( expectedData );
    test_obj.deepEqual( actualData, expectedData, msg );

    test_obj.done();
  };
  // END testNested

  testDummy = function ( test_obj ) {
    test_obj.expect( 0 );
    test_obj.done();

    // See http://stackoverflow.com/questions/10952806
    // Suprisingly, a non-zero exit value (echo $?) is provided
    // when the tests do not pass, which is awesome!
    //
    setTimeout( function (){ process.exit(0); }, 100 );
  };

  module.exports = {
    testSmoke   : testSmoke,
    testShowBug : testShowBug,
    testNested  : testNested,
    testDummy   : testDummy
  };
