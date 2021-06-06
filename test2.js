var run = require('./volk.js');

//compute sum of numbers from 1 to 10 in volk

let prog = `
do(
  define(total,0),
  define(count,1),
  while(<(count,11),
    do(
      define(total, +(total, count)),
      define(count, +(count,1))
    )
  ),
  print(total)
)`;

run.run(prog);

