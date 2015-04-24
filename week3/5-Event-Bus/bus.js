var bus = (function () {
    var events = {};

    function on(eventName, callback) {
        if(typeof(events[eventName]) === "undefined") {
            events[eventName] = [];
        }
        events[eventName].push(callback);
    }

    function trigger(event) {
        if(typeof(events[event]) !== "undefined"){
            events[event].forEach(function(callback) {
                callback();
            });
        }
    }

    function remove(event) {
        if(typeof(events[event]) === "undefined") {
            console.log("Event is not in the events list")
        } else {
            delete events[event];
        }
    }


    return {
        "on" : on,
        "trigger" : trigger,
        "remove" : remove
    };
})();

bus.on("PANIC_EVENT", function() {
    console.log("PANIC_EVENT HAPPENED!");
});

bus.on("PANIC_EVENT", function() {
    console.log("PANIC_EVENT HAPPENED AGAIN!");
});

bus.trigger("PANIC_EVENT");

bus.remove("PANIC_EVENT");

bus.on("Crazy_EVENT", function() {
    console.log("Crazy_EVENT HAPPENED!");
});

bus.trigger("Crazy_EVENT");

