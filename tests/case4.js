/**
* We shouldn't serialize null attributes.
*/
test("serializing null attribute", function() 
{
	function MyClass( str ) {
		this.myAttr = str;	
		this.myAttr2 = null;	
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

	var actual = serialize( null, null, obj, rules, namespaces );	
	var expected = "\n<ex:myc xmlns:ex='http://example.org/' >\n" +
		"<ex:mya>hello</ex:mya></ex:myc>";

	ok( expected == actual, "all pass" );
});

