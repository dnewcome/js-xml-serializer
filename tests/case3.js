/**
* In this test, there is no explicit rule for myAttr, so it gets handled
* by the default rule for String object serialization.
*/
test("test of custom object no attr", function() {

	function MyClass( str ) {
		this.myAttr = str;	
	}

	var obj = new MyClass( "hello" );

	var rules = {
			MyClass: {
					__def__: { nodetype: "element", nodename: "myc", namespace: "http://example.org/" }
			},
			String: {
					__def__: { nodetype: "element", nodename: "String", namespace: "http://example.org/" }
			}	
	}

	var namespaces = {
		"http://example.org/": "ex"
	}

	var actual = jxs.serialize( obj, rules, namespaces );	
	var expected = "\n<ex:myc xmlns:ex='http://example.org/' >\n" +
		"<ex:String>hello</ex:String></ex:myc>";

	equal( actual, expected, "test3 passed" );
});


test("test of custom object", function() 
{
	function MyClass( str ) {
		this.myAttr = str;	
	}

	var obj = new MyClass( "hello" );

	var rules = {
			MyClass: {
					__def__: { nodetype: "element", nodename: "myc", namespace: "http://example.org/" },
					myAttr: { nodetype: "element", nodename: "mya", namespace: "http://example.org/" }
			},
			String: {
					__def__: { nodetype: "element", nodename: "String", namespace: "http://example.org/" },
			}	
	}

	var namespaces = {
		"http://example.org/": "ex"
	}

	var actual = jxs.serialize( obj, rules, namespaces );	
	var expected = "\n<ex:myc xmlns:ex='http://example.org/' >\n" +
		"<ex:mya>hello</ex:mya></ex:myc>";

	equal( actual, expected, "all pass" );
});

test("test2 of custom object", function() {

	function MyClass( str ) {
		this.myAttr = str;	
	}

	var obj = new MyClass( "hello" );

	var rules = {
			MyClass: {
					__def__: { nodetype: "element", nodename: "myc", namespace: "http://example.org/" },
					myAttr: { nodetype: "attribute", nodename: "mya", namespace: "http://example.org/" }
			},
			String: {
					// In this scenario nodetype does not affect the output
					// TODO: this is confusing behavior, should improve this
					__def__: { nodetype: "xxxxx", nodename: "String", namespace: "http://example.org/" },
			}	
	}

	var namespaces = {
		"http://example.org/": "ex"
	}

	var actual = jxs.serialize( obj, rules, namespaces );	
	var expected = "\n<ex:myc ex:mya='hello' xmlns:ex='http://example.org/' ></ex:myc>"

	equal( actual, expected, "test2 passed" );
});
