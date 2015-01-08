var t = require('tape');


var TC = require('../');

// A simple test
var Person = TC.object({
    name: TC.string,
    age: TC.number,
    hobbies: TC.array(TC.string),
    partner: TC.optional(TC.string)
});

function logIsPerson(obj) {
    try { TC.check(Person, obj, 'obj'); }
    catch (e) { console.log(e.message); }
}

function test(type, value, expected) {
    t.test(JSON.stringify(value), function(t) {
        if (expected) t.notOk(type(value), 'should be specified type');
        else t.ok(type(value), 'should not be specified type');
        t.end();
    });
}

test(Person, {name: "John", age: 12}, false);
test(Person, {name: "John", age: 256, hobbies: [1,2,3]}, false);
test(Person, {name: 123, age: 512}, false);
test(Person, {name: "John", age: 1024, partner: false, hobbies: []}, false);
