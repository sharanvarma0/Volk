var run = require('./volk.js');

let prog = "do(define(a,10), print(+(a,10)))";
run.run(prog);

/* This example test program is trying to define a variable 'a' with value of 10. Then it attempts to print (a+10) = (10+10) = 20 onto the screen */

/* To Execute:
    node test1.js (With node.js installed)
*/

