function isArrayLike(object) {
  return Array.isArray(object) ||
   (typeof(object.length) !== "undefined" && typeof(object.item) !== "undefined");
}

function s(selector) {
  if(selector instanceof Element) {
    return selector;
  } else if(typeof(selector) === "string") {
    var domObjects = document.querySelectorAll(selector);

    return new Element(domObjects);
  } else if(typeof(selector) === "object") {
    return new Element(selector);
  } else {
    throw {
      "name": "Selection Error",
      "message": "Cannot select: " + selector.toString()
    };
  }
}

function c(tag) {
    var domObject = document.createElement(tag);
    return new Element(domObject);
}

function Element(domObjects) {
  this.domRepr = function() {
    if(isArrayLike(domObjects) && domObjects.length === 1) {
      return domObjects[0];
    }

    return domObjects;
  };
}

Element.prototype.text = function(text) {
    var textNode = document.createTextNode(text);
    this.domRepr().appendChild(textNode);

    return this;
};

Element.prototype.appendTo = function(container) {
    container.domRepr().appendChild(this.domRepr());
    return this;
};

Element.prototype.on = function(event, callback) {
    this.domRepr().addEventListener(event, callback);

    return this;
};

Element.prototype.addClass = function(newClass) {
  this.forEach(function(domElement) {
    if(domElement.className === "") {
      domElement.className = newClass;
      return this;
    }

    var classes = domElement.className.split(" ");
    classes.push(newClass);
    domElement.className = classes.join(" ");

  });

  return this;
};
