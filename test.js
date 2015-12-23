'use strict';

// 分析一个模块的依赖，之前的
// function analyzeOne(m) {
//   var id = m.id;
//   var depsList;
//   depsList = {};
//   depsList.deps = [];
//   depsList.circleModule = [];
  
//   function deep(module) {
//     module.dependences.forEach(function(moduleId) {
//       // 不一定是和a呢
//       if (moduleId == id) {
//         depsList.circleModule.push(module.id);
//         return;
//       }

//       if (depsList.deps.indexOf(moduleId) === -1) {
//         depsList.deps.push(moduleId);

//         if (all[moduleId].dependences.length) {
//           deep(all[moduleId]);
//         }
//       }
//     });
//   }

//   deep(m);
//   return depsList;
// }


// 分析文件 匹配require ?
var DepGraph = require('./depsGraph');

var graph = new DepGraph();

var nodes = [
  {
    id: 'a',
    dependencies: ['b']
  },
  {
    id: 'b',
    dependencies: ['c', 'e']
  },
  {
    id: 'c',
    dependencies: ['b', 'd']
  },
  {
    id: 'd',
    dependencies: ['b', 'e']
  },
  {
    id: 'e',
    dependencies: []
  }
];
var i;
var j;
var currentNode;

for(i = 0; i < nodes.length; i++) {
  currentNode = nodes[i];
  graph.addNode(currentNode.id);
  for(j = 0; j < currentNode.dependencies.length; j++) {
    graph.addNode(currentNode.dependencies[j]);
    graph.addDependency(currentNode.id, currentNode.dependencies[j]);
  }
}

var r = graph.dependenciesOf('a');
console.log(r);
