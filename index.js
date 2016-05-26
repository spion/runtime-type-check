var TC = {};

TC.type = function(typestr) {
    return function(p) {
        if (typeof(p) !== typestr)
            return "must be a " + typestr;
    }
}

TC.string = TC.type('string');
TC.number = TC.type('number');
TC.boolean = TC.type('boolean');

TC.object = function (spec) {
    return function(obj) {
        if (obj == null)
            return "must be a valid object";
        for (var key in spec)
            if (spec.hasOwnProperty(key)) {
                var test = spec[key](obj[key], key);
                if (test != null)
                    return makeMessage('property', key, test);
            }
    }
}

TC.array = function (itemChecker) {
    return function(arr) {
        if (Object.prototype.toString.call(arr) !== '[object Array]')
            return "must be an array";
        for (var k = 0; k < arr.length; ++k) {
            var result = itemChecker(arr[k]);
            if (result != null) return makeMessage('index', k, result);
        }
    }
}

TC.optional = function(checker) {
    return function(item) {
        if (item != null) {
            var result = checker(item);
            if (result) return result + ' or null';
        }
    }
}

TC.either = function(checker1, checker2) {
    return function(item) {
        var r1 = checker1(item), r2 = checker2(item);
        if (r1 != null && r2 != null)
            return "either " + r1 + " or " + r2;
    }
}

TC.both = function(checker1, checker2) {
    return function(item) {
        var c1 = checker1(item);
        if (c1 != null) return c1;
        var c2 = checker2(item);
        if (c2 != null) return c2;
    }
}

// Helper function for messages that contain keys
function makeMessage(kind, key, msg) {
    return kind + ' ' + key + " " + msg;
}

TC.check = function(type, val, msg) {
    msg = msg ? msg + ': ' : ''
    var m = type(val);
    if (m != null) throw new TypeError(msg + m);
}

module.exports = TC;
