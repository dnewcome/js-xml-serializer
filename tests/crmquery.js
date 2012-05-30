/*
Example of what xml serialization from MS CRM .NET types looks like.
This is what we are trying to emulate here. The current test is not 
comprehensive yet.

<Execute xmlns="http://schemas.microsoft.com/crm/2007/WebServices">
<Request xsi:type="RetrieveMultipleRequest" ReturnDynamicEntities="true">
<Query xmlns:q1="http://schemas.microsoft.com/crm/2006/Query" xsi:type="q1:QueryExpression">
<q1:EntityName>new_dynamicform</q1:EntityName>
<q1:ColumnSet xsi:type="q1:AllColumns" />
<q1:Distinct>false</q1:Distinct>
<q1:PageInfo><q1:PageNumber>0</q1:PageNumber><q1:Count>0</q1:Count></q1:PageInfo>
<q1:LinkEntities />
<q1:Criteria><q1:FilterOperator>And</q1:FilterOperator><q1:Conditions /><q1:Filters><q1:Filter><q1:FilterOperator>And</q1:FilterOperator><q1:Conditions><q1:Condition><q1:AttributeName>new_name</q1:AttributeName><q1:Operator>Like</q1:Operator><q1:Values><q1:Value xsi:type="xsd:string">%</q1:Value></q1:Values></q1:Condition></q1:Conditions><q1:Filters /></q1:Filter></q1:Filters></q1:Criteria>
<q1:Orders /></Query></Request>
</Execute>
*/ 
test( "crmquery serialization", function() 
{
	/**
	 * Crmquery object model
	 */
	function Execute( request ) {
		this.Request = request;
	}

	function Request( query ) {
		this.Query = query;
	}

	function RetrieveMultipleRequest( query ) {
		this.type = "RetrieveMultipleRequest";
		this.Query = query;
	}

	function Query( str ) {
		this.name = str;
	}

	function EntityName() {}
	function ColumnSet() {}
	function Distinct() {}

	var execute =
		new Execute( 
			new RetrieveMultipleRequest( 
				new Query( "foo" )
			)
		);

	var namespaces = {
		"http://schemas.microsoft.com/crm/2007/WebServices": "ws", 
		"http://www.w3.org/2001/XMLSchema-instance": "xsi", 
		"http://schemas.microsoft.com/crm/2006/Query": "q1",
		"http://www.w3.org/2001/XMLSchema": "xs"
	}

	var exrules = {
		Object: {
				__def__: { nodetype: "element", nodename: "obj", namespace: "http://example.org/" },
				attr1: { nodetype: "element", nodename: "first", namespace: "http://example.org/" }, 
				attr2: { nodetype: "element", nodename: "myc-attr2", namespace: "http://example.org/" } 
		},
		Array: {
				__def__: { nodetype: "element", nodename: "arr", namespace: "http://example.org/" },
				attr1: { nodetype: "element", nodename: "first", namespace: "http://example.org/" } 
		},
		String: {
				__def__: { nodetype: "element", nodename: "str", namespace: "http://www.w3.org/2001/XMLSchema" },
		},
		Execute: {
				__def__: { nodetype: "element", nodename: "Execute", namespace: "http://schemas.microsoft.com/crm/2007/WebServices" }
		},
		Request: {
				__def__: { nodetype: "element", nodename: "Request", namespace: "http://schemas.microsoft.com/crm/2007/WebServices" }
		},
		RetrieveMultipleRequest: {
				__def__: { nodetype: "element", nodename: "Request", namespace: "http://schemas.microsoft.com/crm/2007/WebServices" },
				type: { nodetype: "attribute", nodename: "type", namespace: "http://www.w3.org/2001/XMLSchema-instance" }
		},
		Query: {
				__def__: { nodetype: "element", nodename: "Query", namespace: "http://schemas.microsoft.com/crm/2006/Query" }
		}
	}

	var actual = jxs.serialize( execute, exrules, namespaces ); 
	var expected = '\n' +
	"<ws:Execute xmlns:ws='http://schemas.microsoft.com/crm/2007/WebServices' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:q1='http://schemas.microsoft.com/crm/2006/Query' xmlns:xs='http://www.w3.org/2001/XMLSchema' >\n" +
	"<ws:Request xsi:type='RetrieveMultipleRequest'>\n" +
	"<q1:Query>\n" +
	"<xs:str>foo</xs:str></q1:Query></ws:Request></ws:Execute>";

	equal( actual, expected, "assert equal" );
});
