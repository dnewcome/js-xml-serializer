test("test basic serialization", function() {

	var obj = {};
	var arr = [];
	var str = "";

	var rules = {
			Object: {
					__def__: { nodetype: "element", nodename: "obj", namespace: "http://example.org/" },
			},
			Array: {
					__def__: { nodetype: "element", nodename: "arr", namespace: "http://example.org/" }
			},
			String: {
					__def__: { nodetype: "element", nodename: "str", namespace: "http://example.org/" },
			}
	}

	var namespaces = {
		"http://example.org/": "ex", 
	}

	var actual = serialize( null, null, obj, rules, namespaces );	
	var expected = "\n<ex:obj xmlns:ex='http://example.org/' ></ex:obj>";
	ok( actual == expected, "basic object test");

	actual = serialize( null, null, arr, rules, namespaces );	
	expected = "\n<ex:arr xmlns:ex='http://example.org/' ></ex:arr>";
	ok( actual == expected, "basic object test");

	actual = serialize( null, null, str, rules, namespaces );	
	expected = "\n<ex:str xmlns:ex='http://example.org/' ></ex:str>";
	ok( actual == expected, "basic object test");
});
