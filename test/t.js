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
      ]
    },
    // Declare utlities
    getVarType, cloneFriendList,
    // Declare init used to reset state for tests

    // Declare tests
    testSmoke, testShowBug, testDummy
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
    testDummy   : testDummy
  };
