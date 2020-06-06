const _ = require('underscore');

// When we write require, node resolves it in 3 steps:
// core module (first it checks if underscore is a core module)
// file/folder (it checks if underscore.js is a file in same folder or underscore is a folder & it has file index.js inside it.)
// node modules (If not found above, it then checks inside node modules folder)

var result = _.contains([1,2,3],1);
console.log(result);


