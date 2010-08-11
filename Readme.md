# About

js-xml-serializer is a Javascript serialization library that allows an arbitrary Javascript object to be serialized as XML according to a set of supplied rules and namespace definitions. The motivation behind this project was the author's inability to find an existing Javascript serialization method that supported namespaces and allowed enough control to allow sending complex Javascript objects as arguments to a SOAP web service.

# Usage

In the nominal case, given a Javascript object like the following:

    var obj = {
        attr1: "two",
        attr2: new MyClass( "hello" ),
        attr3: [ "three", "four" ]
    };

We can produce a simple XML document:

    <Object>
        <String>two</String>
        <MyClass>
            <String>hello</String>
        </MyClass>
        <Array>
            <String>three</String>
            <String>four</String>
        </Array>
    </Object>

Using the following code:

    serialize( obj );

In order to enable more control over serialization, we can create a structure outlining specific serialization rules to be applied to the object:

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

The rule denoted by `__def__` will be applied to an appearance of the type in the object to be serialized if no other rule matches -- that is, if no rule that applies to a particular member of another type overrides it.

Namespace prefixes are specified as the following:
    
    var namespaces = {
        "http://example.org/": "ex", 
    }

The serialized XML output looks like this:

    <ex:obj xmlns:ex='http://example.org/'>
        <ex:first>two</ex:first>
        <ex:myc-attr2>
            <ex:str>hello</ex:str>
        </ex:myc-attr2>
        <ex:arr>
            <ex:str>three</ex:str>
            <ex:str>four</ex:str>
        </ex:arr>
    </ex:obj>

# Status

js-xml-serializer is being developed as part of a larger project so it is only designed to solve serialization issues as-needed for that particular project. It is provided in the hopes that others may suggest extensions to cover cases that the author has not considered. This software is not being used by the author in production yet, and it is suggested that others test it fully before using it.

# Future work
 - Clean up output: Output is not indented and some spurious (semantically insignificant) whitespace is emitted.
 - Provide default rules: Support for supplying a base rule set would make using the library more convenient. Provisions for merging rule sets could also prove useful.
 - Allow default namespace: Output explicitly defines a prefix for all namespaces. While semantically correct, it may produce more readable output to determine one namespace to use for the default.
 - Change __def__ mechanism: the mechanism by which the default serialization rule is specified may not be the best solution. Comments are welcome for addressing this.
 - Don't pollute namespace: No wrapper object is provided around the basic serialize() function.

# License
js-xml-serializer is copyright 2010 Dan Newcome and is provided under the MIT free software license. See the file LICENSE for 
the full text.

