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

test("type and property name collision", function()
{
	var rules = {
			book: {
					__def__: { nodetype: "element", nodename: "book", namespace: "http://example.org/" },
					name: { nodetype: "element", nodename: "name", namespace: "http://example.org/" },
					age: { nodetype: "element", nodename: "age", namespace: "http://example.org/" }
			},
			part: {
					__def__: { nodetype: "element", nodename: "part", namespace: "http://example.org/" },
					partid: { nodetype: "element", nodename: "partid", namespace: "http://example.org/" }
			},
			String: {
					__def__: { nodetype: "element", nodename: "String", namespace: "http://example.org/" }
			},
			Array: {
					__def__: { nodetype: "element", nodename: "Array", namespace: "http://example.org/" }
			}	
	}

	var namespaces = {
		"http://example.org/": "ex"
	}

	function part( partid ) {
		this.partid = partid;
	}

	function book() {
		var name;
		var age;
		var part = [];
	}

	var book_1 = new book();
	book_1.name = 'Deepak';
	book_1.age = '12';
	var part1 = new part( '1' );
	var part2 = new part( '2' );
	book_1.part = [ part1, part2 ];

	var expected = "\n<ex:book xmlns:ex='http://example.org/' >\n" +
		"<ex:name>Deepak</ex:name>\n" +
		"<ex:age>12</ex:age>\n" +
		"<ex:Array>\n" +
		"<ex:part>\n" +
		"<ex:partid>1</ex:partid></ex:part>\n" +
		"<ex:part>\n" +
		"<ex:partid>2</ex:partid></ex:part></ex:Array></ex:book>"; 

	var actual = serialize( null, null, book_1, rules, namespaces );	
	console.log( actual );
	console.log( expected );

	equal( actual, expected, "failed" );
});
