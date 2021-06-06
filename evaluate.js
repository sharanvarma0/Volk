/* This file defines the Special constructs (if, do, etc) and the evaluator. The evaluator and the special forms are tightly coupled
so they need to be in one file. Also, because constructs in special forms make use of the evaluator to simplify and evaluate their code */

// Following is the defination and declarations of the special contructs. As visible, the constructs and their logic are stored in an object
// Named SpecialForms. The method can be referenced as SpecialForms.<construct> for eg. SpecialForms.if with arguments.

SpecialForms = Object.create(null);

SpecialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError("If called with invalid arguments");
    }
    else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    }
    else {
        return evaluate(args[2], scope);
    }
};

SpecialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("While called with invalid arguments");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }

    return false;
};

SpecialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

SpecialForms.define = (args, scope) => {
    if ((args.length != 2) || (args[0].type != "word")) {
        throw new SyntaxError("Invalid Defination. Please check type");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

SpecialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError("No function body present");
    }
    let body = args[args.length - 1];
    let params  = args.slice(0, args.length -1).map(expr => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function() {
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

// This is the end of the SpecialForms defination. All constructs have been defined.

/* The following code defines the global scope, again as a javascript object. This scope has bindings 
and values of variables like true and false booleans. The properties are the binding names and the values
are the result of the evaluated expression bound to these property bindings */

topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ['+', '-', '*', '/', '==', '<', '>']) {
    topScope[op] = Function("a,b", `return a ${op} b`);
}

topScope.print = (value) => {
    console.log(value);
    return value;
};

// End of global scope defination. Would expand in the future. Might need a seperate module for different
// inbuilt data structures later


/* Defined below is the evaluator. It takes the expression returned from parser and the scope, evaluates and 
returns the value. This is the meat of the language and operates directly on the syntax tree */

evaluate = function(expr, scope) {
    if (expr.type == "value") {
        return expr.value;
    }
    else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        }
        else {
            throw new ReferenceError("Undefined Binding: " + expr.name);
        }
    }
    else if (expr.type == "apply") {
        let {operator, args} = expr;
        if ((operator.type == "word") && (operator.name in SpecialForms)) {
            return SpecialForms[operator.name](expr.args, scope);
        }
        else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") {
                return op(...args.map(arg => evaluate(arg, scope)));
            }
            else {
                throw new TypeError("Applying a non function");
            }
        }
    }
}

// End of evaluator. Might expand as more functionality is added

/* The following section just defines exports variables for CommonJS modules. This does not have anything 
to do with the functionality of the language itself. The language can be monolithic and defined in a single file */

exports.SpecialForms = SpecialForms;
exports.topScope = topScope;
exports.evaluate = evaluate;
