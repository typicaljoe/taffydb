var TAFFY = require("./taffy").taffy;

console.log(TAFFY);

var friendList = [
	{"id":1,"gender":"M","first":"John","last":"Smith",
    	"city":"Seattle, WA","status":"Active"},
  	{"id":2,"gender":"F","first":"Kelly","last":"Ruth",
    	"city":"Dallas, TX","status":"Active"},
  	{"id":3,"gender":"M","first":"Jeff","last":"Stevenson",
    	"city":"Washington, D.C.","status":"Active"},
  	{"id":4,"gender":"F","first":"Jennifer","last":"Gill",
    	"city":"Seattle, WA","status":"Active"}  
];

var friend_db = TAFFY(friendList);

var taffy_map = {
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

for ( key_name in taffy_map ){
  if ( taffy_map.hasOwnProperty( key_name ) ) {
    data_val = taffy_map[ key_name ];

    var var_type = null;

    if (undefined === data_val ){ 
    	var_type = 'Undefined'; 
    }
    else if (data_val === null ){ 
    	var_type = 'Null'; 
    }
    else{
    	var_type = {}.toString.call(data_val).slice(8, -1);
    } 

    msg_text = key_name + ': \n ===================\n';

    switch ( var_type ){
      case 'Object'   :
        if ( data_val.hasOwnProperty( 'get' ) ){
          msg_text += JSON.stringify( data_val.get() );
        }
        else {
          msg_text += JSON.stringify( data_val );
        }
        break;
      case 'Number' :
        msg_text += String( data_val );
        break;

      default :
        msg_text += JSON.stringify( data_val );
    }

    msg_text += '\n\n';

    console.log( msg_text );
  }
}

console.log( 'Example filter bug - rows changed without using '
  + '.update() will filter by their original values. '
);
friend_db().each(function ( row_map, idx ) {
  if ( row_map.city === 'Seattle, WA' ){
    row_map.city = 'WallaWalla, WA';
  }
});

console.log( 'We expect 0 rows, but get 2... ' );
console.log(
  friend_db().filter({ city : 'Seattle, WA'}).get()
);
console.log( '...even though the city has changed in the collection.' );
console.log( friend_db().get() );
console.log( '' );

console.log( 'Example filter when .update() is used.');
friend_db = TAFFY( friendList );

friend_db({ city : 'Seattle, WA' })
  .update({ city : 'WallaWalla, WA' });

console.log( 'now we get the correct response (0 rows) ...' );
console.log( 
  friend_db().filter({ city : 'Seattle, WA'}).get()
);
console.log( friend_db().get() );
console.log( '... that reflects the taffy collection.' );