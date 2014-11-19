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


logIsPerson({name: "John", age: 128});
logIsPerson({name: "John", age: 256, hobbies: [1,2,3]});
logIsPerson({name: 123, age: 512});
logIsPerson({name: "John", age: 1024, partner: false, hobbies: []});
