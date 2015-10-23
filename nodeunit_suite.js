/*jslint            node : true, continue : true,
  devel   : true, indent : 2,    maxerr   : 50,
  newcap  : true, nomen  : true, plusplus : true,
  regexp  : true, vars   : false, white  : true
  unparam : true, sloppy : true,
*/
/*global global, module, require, $, KI, document, window */
// global global, module, require, $, KI, document, window

  'use strict';
  // BEGIN module-scope vars
  var
    TAFFY = require( './taffy' ).taffy,

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
      friend_db, test_map, val_map, key_name,
      data_val, msg_str, val_str, var_type
      ;

    test_obj.expect( 9 );
    friend_db = TAFFY( cloneFriendList() );

    test_map = {
      by_city         : friend_db({ city : "Seattle, WA"}),
      by_id           : friend_db({ id : 1}),
      by_id_f         : friend_db({ id : '1'}),
      by_name         : friend_db({ first : 'John',last:'Smith'}),
      kelly_by_id     : friend_db({ id : 2}).first(),
      kelly_last_name : friend_db({ id : 2}).first().last,
      id_list         : friend_db().select( 'id' ),
      city_list       : friend_db().distinct( 'city' ),
      filter_list     : friend_db().filter({ city : "Seattle, WA"})
    };
    val_map = {
      by_city         : '[{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}]',
      by_id           : '[{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true}]',
      by_id_f         : '[]',
      by_name         : '[{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true}]',
      kelly_by_id     : '{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active","___id":"T000002R000003","___s":true}',
      kelly_last_name : '"Ruth"',
      id_list         : '[1,2,3,4]',
      city_list       : '["Seattle, WA","Dallas, TX","Washington, D.C."]',
      filter_list     : '[{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active","___id":"T000002R000002","___s":true},{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active","___id":"T000002R000005","___s":true}]'
    };

    for ( key_name in test_map ){
      if ( test_map.hasOwnProperty( key_name ) ) {
        data_val = test_map[ key_name ];
        var_type = getVarType( data_val );

        switch ( var_type ){
          case 'Object'   :
            if ( data_val.hasOwnProperty( 'get' ) ){
              val_str = JSON.stringify( data_val.get() );
            }
            else {
              val_str = JSON.stringify( data_val );
            }
            break;
          case 'Number' :
            val_str = String( data_val );
            break;

          default :
            val_str = JSON.stringify( data_val );
        }
        // msg_str = 'Test: ' + key_name + ' === ' + val_str;
        test_obj.equal( val_str, val_map[ key_name ] ); //, msg_str );
      }
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
    // setTimeout( function (){ process.exit(0); }, 100 );
  };

  module.exports = {
    testSmoke   : testSmoke,
    testShowBug : testShowBug,
    testDummy   : testDummy
  };
