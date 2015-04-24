var queue = (function () {
    var arr = [];

    function pop() {
        var result = arr.shift();
        return result;
    }

    function push(item) {
        arr.push(item);
    }

    function isEmpty() {
        return arr.length === 0;
    }

    return {
        "pop" : pop,
        "push" : push,
        "isEmpty" : isEmpty
    };
})();
