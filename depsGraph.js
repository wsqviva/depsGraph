'use strict';

function inArray(item, arr) {
  return arr.indexOf(item) > -1;
}

/*
 *  TODO: 依赖路径不好看, pop为什么没有pop完？
 */
function createDFS(edges) {
  var currentPath = [];
  var visited = {};
  var result = [];

  return function DFS(name) {
    visited[name] = true;
    currentPath.push(name);

    if (!inArray(name, result)) {
      result.push(name);
    }

    edges[name].forEach(function(edgeName) {
      // node not visited
      if (!visited[edgeName]) {
        DFS(edgeName);
        return;
      }

      if (inArray(edgeName, currentPath)) {
        currentPath.push(edgeName);
        console.log('Dependency Cycle Found: ' + currentPath.join(' -> '));
      }
    });

    currentPath.pop();

    return result;
  };
}


function DepsGraph() {
  this.nodes = {};
  this.outgoingEdges  = {};
  this.incomingEdges = {};
};

DepsGraph.prototype = {

  /*
   * outgoingEdges = {
   *   'a': ['b', 'c', 'd']
   * }
   * 
   */
  addNode: function(id) {
    if (!this.hasNode(id)) {
      this.nodes[id] = id;
      this.outgoingEdges[id] = [];
      this.incomingEdges[id] = [];
    }
  },

  removeNode: function(id) {
    if (this.hasNode(id)) {
      delete this.nodes[id];
      delete this.outgoingEdges[id];
      delete this.incomingEdges[id];
      // 对这个id依赖的也要删除
      [this.incomingEdges, this.outgoingEdges].forEach(function (edgeList) {
        Object.keys(edgeList).forEach(function (key) {
          var idx = edgeList[key].indexOf(name);
          if (idx >= 0) {
            edgeList[key].splice(idx, 1);
          }
        }, this);
      });
    }
  },

  hasNode: function(id) {
    return !!this.nodes[id];
  },

  addDependency: function(from, to) {
    if (!this.hasNode(from)) {
      throw new Error('Node does not exist: ' + from);
    }
    if (!this.hasNode(to)) {
      throw new Error('Node does not exist: ' + to);
    }
    if (!inArray(to, this.outgoingEdges[from])) {
      this.outgoingEdges[from].push(to);
    }
    if (!inArray(from, this.incomingEdges[to])) {
      this.incomingEdges[to].push(from);
    }
  },

  dependenciesOf: function(id) {
    if (this.hasNode(id)) {
      var DFS = createDFS(this.outgoingEdges);
      return DFS(id);
    } else {
      throw new Error('Node does not exist' + id);
    }
  }
};


module.exports = DepsGraph;
