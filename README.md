# runtime-type-check

Compose and check JS types at runtime


## Example

```js
var TC = require('runtime-type-check');

var Person = TC.object({
    name: TC.string,
    age: TC.number,
    hobbies: TC.array(TC.string),
    partner: TC.optional(TC.string)
});

function runsOnPerson(person) {
  TC.check(Person, person, 'person');
  // continue with code
}

//will throw a TypeError: person: property hobbies must be an array
runsOnPerson({name: "John", age: 128});
```

## how it works

Every checker is a function that takes an input and returns an error message if
the input is not correct, null otherwise. You can add your own arbitrary checkers

`TC.check` runs a checker and throws a type error if it returns a message.

## License

ISC
