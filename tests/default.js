test("default serialization", function() 
{
	function MyClass( str ) {
		this.mcAttr = str;	
	}

	var obj2 = {
		attr1: "two",
		attr2: new MyClass( "hello" ),
		attr3: [ "three", "four" ]
	};

	var actual = serialize( obj2 );
	var expected = 
		'<Object>\n' +
		'<String>\n' +
		'two\n' +
		'</String>\n' +
		'<MyClass>\n' +
		'<String>\n' +
		'hello\n' +
		'</String>\n' +
		'</MyClass>\n' +
		'<Array>\n' +
		'<String>\n' +
		'three\n' +
		'</String>\n' +
		'<String>\n' +
		'four\n' +
		'</String>\n' +
		'</Array>\n' +
		'</Object>\n';
	equal( actual, expected, "assert" ); 
});
