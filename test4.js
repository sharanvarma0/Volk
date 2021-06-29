var run = require('./volk.js');
var prog = `
do(
  define(pow, fun(base, exp,
    if (==(exp,0),
      1, *(base,pow(base, -(exp,1)))
    )
  )),
  print(pow(2,10))
)`;

run.run(prog);

/* This is defining a function to calculate power of an element. The function is defined first with define keyword. then the function is called with arguments 2,10. */
