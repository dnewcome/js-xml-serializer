test("test of compound object", function() {

	function MyClass( str ) {
		this.mcAttr = str;	
	}

	var obj2 = {
		attr1: "two",
		attr2: new MyClass( "hello" ),
		attr3: [ "three", "four" ]
	};

	var rules = {
			Object: {
					__def__: { nodetype: "element", nodename: "obj", namespace: "http://example.org/" },
					attr1: { nodetype: "element", nodename: "first", namespace: "http://example.org/" }, 
					attr2: { nodetype: "element", nodename: "myc-attr2", namespace: "http://example.org/" } 
			},
			Array: {
					__def__: { nodetype: "element", nodename: "arr", namespace: "http://example.org/" }
			},
			String: {
					__def__: { nodetype: "element", nodename: "str", namespace: "http://example.org/" },
			},
			MyClass: {
					__def__: { nodetype: "element", nodename: "myc", namespace: "http://example.org/" }
			}
	}

	var namespaces = {
		"http://example.org/": "ex", 
	}

	var actual = jxs.serialize( obj2, rules, namespaces );	
	var expected = "\n<ex:obj xmlns:ex='http://example.org/' >\n" +
		"<ex:first>two</ex:first>\n" +
		"<ex:myc-attr2>\n" +
		"<ex:str>hello</ex:str></ex:myc-attr2>\n" +
		"<ex:arr>\n" +
		"<ex:str>three</ex:str>\n" +
		"<ex:str>four</ex:str></ex:arr></ex:obj>";

	equal( actual, expected, "all pass" );
});
