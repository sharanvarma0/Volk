var run = require('./volk.js');

//create a function that adds 1 and returns result

var prog = `
do(
  define(plusOne, fun(a, +(a,1))),
  print(plusOne(1))
)`

run.run(prog);
