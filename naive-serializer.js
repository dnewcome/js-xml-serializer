// requires ../js-shared-utils/util.js

function serialize( obj ) {
	var retval = "<" + obj.constructor.name + ">\n";
	if( typeOf( obj ) == 'object' || typeOf( obj ) == 'array' ) {
		for( var item in obj ) {
			retval += serialize( obj[item] );	
		}
	}
	else {
		retval += obj + "\n";
	}
	retval += "</" + obj.constructor.name + ">\n";
	return retval;
}	
