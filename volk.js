/* This file defines the parser. As the parser is a first and seperate step, This has been defined in a seperate file to avoid tight coupling between evaluator and parser.
This is defined here in a different file for readability purposes */

// Import evaluator for next steps.
var evaluator = require('./evaluate.js');  

// the parse expression takes a string, escapes spaces and converts all the text into lang objects.

function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
        expr = {
            type: "value",
            value: match[1]
        };
    }
    else if (match = /^\d+\b/.exec(program)) {
        expr = {
            type: "value",
            value: Number(match[0])
        };
    }
    else if (match = /^[^\s(),"]+/.exec(program)) {
        expr = {
            type: "word",
            name: match[0]
        };
    }
    else {
        throw new SyntaxError("Unexpected Syntax: "+program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) {
        return "";
    }
    return string.slice(first);
}

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(") {
        return {
            expr: expr,
            rest: program
        };
    }

    program = skipSpace(program.slice(1));
    expr = {
        type: "apply",
        operator: expr,
        args: []
    };

    while (program[0] != ")") {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        }
        else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    
    return parseApply(expr, program.slice(1));
}

function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected Text after program");
    }
    return expr;
}    

function run(program) {
    return evaluator.evaluate(parse(program), Object.create(evaluator.topScope));
}

// A test code can be written here. I have however exported parser.
// import this in another file and test. This would modularize the tests from the implementation.


exports.run = run;
