Volk
====
It is a simple programming language I made in javascript using expression based structures.
Everything in volk is an expression. 

The parser takes a program and then creates expression objects. The expression objects are evaluated
by the evaluator. The evaluator then returns the result.

The Parser
==========
It is a simple string parser written in javascript. The parser defines 3 types of objects for the volk 
language.

    - Value: All objects of type value are identical to integers or strings. The parser uses regular expressions 
             to see the kind of input from the program and creates a value object to be a string or 
             number.

    - Word: All objects of type word are identifiers. These are bindings of a particular string to a value
            or maybe a function. The values of words are also fundamentally expressions in this language.

    - Applications: All application objects are essentially functions as expressions. The parser recursively
                    parses application objects to get the fundamental objects from it and then perhaps execute
                    a function or special defination.

The Evaluator
=============
The parser only generates the objects. In order to evaluate them, the parser must delegate the objects 
obtained to be processed or evaluated to produce results. This is done by the evaluator. The evaluator accepts
the syntax tree (a series of objects representing a program structure) and evaluates them recursivelly to
obtain a result. The evaluator then returns that result.

Additional comments on working can be found in the code. It has been split into files. 
    - evaluator.js exports the evaluator function that evaluates obtained syntax tree detailed above.
    - the parser.js exports the parser which parses the program string to generate objects.

The Basic flow of the language is below.

    1. The Program is written in a text editor
                     
    2. The program is passed to the parser
                    
    3. The parser generates objects and syntax tree
                    
    4. The syntax tree and objects are passed to evaluator
                    
    5. The evaluator looks at the scope and user definations
                    
    6. The evaluator executes the functions, constructs and expressions
                    
    7. The evaluator returns the output to stdout

The features of this language are very basic. This was created by me to experiment with capabilities of 
javascript and learn something new along the way. This is by no means a fully fledged industry ready language
as of now.

Special constructs
===================

If
--
This is similar to the ternary operator from other languages (?:). It is an expression and expects 3 arguments.
Evalute the first argument, if true, evaluate the second. If false, evaluate the third.

While
-----
Repeatedly execute a statement. Expects 2 arguments. the evaluator will evaluate the first condition until false
and repeatedly execute the second argument.

Do
--
Execute a series of statements as a block.

Define
------
define user defined functions. A word as the first argument and an expression to bind to that word as a second argument. 
The expression can be evaluated by referencing the word.


The parser code - volk.js
The evaluator code - evaluate.js
These export objects, functions that can be imported to a js program.
I have included 4 test programs which test logic. The programs have the tests documented.

Will try to keep this document updated. For now, These details are what I found important :)
