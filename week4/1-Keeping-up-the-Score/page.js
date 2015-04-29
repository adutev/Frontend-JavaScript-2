function Element(domElement) {
    this.domElement = domElement;
}

Element.createElement = function(tagName, content, attributes) {

    var element = document.createElement(tagName);
    var content = document.createTextNode(content);

    for(var att in attributes) {
        element.setAttribute(att, attributes[att])
    }
    element.appendChild(content);

    return new Element(element);
};


Element.prototype.appendChild = function(child) {
    if(child instanceof Element) {
        child = child.domElement;
    }

    this.domElement.appendChild(child);
};

Element.prototype.on = function(type, callback) {
    this.domElement.addEventListener(type, callback);
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Init the scores
    var scores = {
        "teamA" : 0,
        "teamB" : 0
    }

    // What to do when button clicked
    function increaseScore (event) {
        var id = event.target.id;
        scores[id] += 1;
        // Update the scores
        document.getElementById(id + "Score").firstChild.data = scores[id];
    }

    // Select the container
    var container =  document.getElementById("container");

    // Create the buttons
    var buttonA = Element.createElement("button", "Team A", {id: "teamA"});
    var buttonB = Element.createElement("button", "Team B", {id: "teamB"});
    // Add click handlers
    buttonA.on("click", increaseScore);
    buttonB.on("click", increaseScore)

    // Create the heading
    var headingA = Element.createElement("h1", "Team A Score: ");
    var headingB = Element.createElement("h1", "Team B Score: ");
    var scoreA = Element.createElement("span", "0", {id: "teamAScore"});
    var scoreB = Element.createElement("span", "0", {id: "teamBScore"});
    headingA.appendChild(scoreA);
    headingB.appendChild(scoreB);
    // Create the add the score

    container.appendChild(buttonA.domElement);
    container.appendChild(headingA.domElement);
    container.appendChild(buttonB.domElement);
    container.appendChild(headingB.domElement);
});