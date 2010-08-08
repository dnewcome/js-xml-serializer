// requires ../js-shared-utils/util.js

function serialize( parent, member, obj, rules, namespaces, debug ) {
	/*
	if( debug ) {
		console.log( "Parent: " + parent.constructor.name );
		console.log( "Object: " + obj.constructor.name );
	}
	*/

	// write namespaces in the root element
	var xmlns = "";
	if( parent == null ) {
		for( var namespace in namespaces ) {
			var prefix = namespaces[ namespace ];
			xmlns += "xmlns:" + prefix + "='" + namespace + "' ";
		}	
	}

	var retval = "";
	var rule;
	if( parent != null ) {
		rule = rules[ parent.constructor.name ][ member ];
	}
	else {
		rule = rules[ obj.constructor.name ][ "__def__" ];
	}
	if( rule == undefined ) {
		rule = rules[ obj.constructor.name ][ "__def__" ];
	}
	// TODO: do we need this check?
	if( rule.nodetype == "element" ) {
		var prefix = namespaces[ rule.namespace ] || rule.namespace || "";
		if( prefix != "" ) {
			prefix += ":";
		}
		// TODO: if prefix not found, we should set xmlns: to the namespace of the element, if 
		// element is in a namespace
		retval = "\n" + "<" + prefix + rule.nodename + " " + processAttributes( obj, rules, namespaces ) + " " + xmlns + ">";
		if( typeOf( obj ) == 'object' || typeOf( obj ) == 'array' ) {
			for( var item in obj ) {
				retval += serialize( obj, item, obj[item], rules, namespaces );	
			}
		}
		else {
			retval += obj;
		}
		retval += "</" + prefix + rule.nodename + ">";
	}
	else if( rule.nodetype == "content" ) {
		retval += obj;
	}

	return retval;
}	

function processAttributes( obj, rules, namespaces ) {
	var retval = "";
	for( var item in obj ) {
		var rule = rules[ obj.constructor.name ][ item ];
		if( rule && rule.nodetype == "attribute" ) {
			var prefix = namespaces[ rule.namespace ] || rule.namespace || "";
			if( prefix != "" ) {
				prefix += ":";
			}
			retval += prefix + rule.nodename + "='" + obj[ item ] + "'";
		}
	}
	return retval;
}
