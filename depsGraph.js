'use strict';

function DepsGraph() {
  this.nodes = {};
  this.outgoingEdges  = {};
  this.incomingEdges = {};
  this.circleEdges = [];
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
    ;
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
      var result = DFS(id);
    } else {
      throw new Error('Node does not exist' + id);
    }
  }
};
