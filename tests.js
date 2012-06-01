var fs = require('fs')
var graph = require('./index.js')

exports.preinit_and_add = function(test){
    var b = new graph.GraphNode({name: 'b'})
    var c = new graph.GraphNode({name: 'c'})
    var a = new graph.GraphNode({name: 'a', children: [b,c]})

    var d = new graph.GraphNode({name: 'd'})
    a.addchild(d)
    
    test.equals(JSON.stringify(a.children.map(function(child) { return child.get('name') })),'["b","c","d"]')

    test.done()
};


exports.replace = function(test){
    var a = new graph.GraphNode({name: 'a'})
    var b = new graph.GraphNode({name: 'b'})
    var c = new graph.GraphNode({name: 'c'})
    var d = new graph.GraphNode({name: 'd'})
    var x = new graph.GraphNode({name: 'x'})
    
    a.addchild(b)
    a.addchild(c)
    a.addchild(d)

    a.replacechild(c,x)

    test.equals(JSON.stringify(a.children.map(function(child) { return child.get('name') })),'["b","x","d"]')

    test.done()
};

