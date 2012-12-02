var fs = require('fs')
var graph = require('./index.js')

exports.preinit_and_add = function(test){
    var b = new graph.DirectedGraphNode({name: 'b'})
    var c = new graph.DirectedGraphNode({name: 'c'})
    var a = new graph.DirectedGraphNode({name: 'a', children: [b,c]})

    var d = new graph.DirectedGraphNode({name: 'd'})
    a.addchild(d)
    
    test.equals(JSON.stringify(a.children.map(function(child) { return child.get('name') })),'["b","c","d"]')

    test.done()
};


exports.replace = function(test){
    var a = new graph.DirectedGraphNode({name: 'a'})
    var b = new graph.DirectedGraphNode({name: 'b'})
    var c = new graph.DirectedGraphNode({name: 'c'})
    var d = new graph.DirectedGraphNode({name: 'd'})
    var x = new graph.DirectedGraphNode({name: 'x'})
    
    a.addchild(b)
    a.addchild(c)
    a.addchild(d)

    a.replacechild(c,x)

    test.equals(JSON.stringify(a.children.map(function(child) { return child.get('name') })),'["b","x","d"]')

    test.done()
};



exports.depthfirst = function(test){
    var node = graph.DirectedGraphNode.extend4000(graph.TraversalMixin)

    var a = new node({name: 'a'})
    var b = new node({name: 'b'})
    var c = new node({name: 'c'})
    var d = new node({name: 'd'})
    var e = new node({name: 'e'})
    
    a.addchild(b)
    b.addchild(c)
    b.addchild(d)
    d.addchild(e)

    var reduce = a.childrenDepthFirst(function(element,reduce) { 
        reduce[element.get('name')] = true
        return reduce
    }, {})
    test.equals(JSON.stringify(reduce),'{"a":true,"b":true,"c":true,"d":true,"e":true}')
    test.done()
};


exports.has = function (test) {
    var node = graph.GraphNode

    var a = new node({name: 'a'})
    var b = new node({name: 'b'})

    a.addplug('messages','message')
    
    test.equals(false,a.hasmessage(b))
    a.addmessage(b)
    test.equals(true,a.hasmessage(b))
    test.done()    
}
