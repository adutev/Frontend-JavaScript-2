function Paragraph(text) {
    this.text = text;
}

Paragraph.prototype.render = function() {
    return "<p> " + this.text + "</p>";
};

function Div() {
    this.contents = [];
}

Div.prototype.addChild = function(child) {
    this.contents.push(child);
};

Div.prototype.render = function() {
    if(this.contents.length === 0) {
        return "<div></div>";
    }

    var result = "<div>";
    this.contents.forEach(function (child) {
        result += "\n  " + child.render();
    });

    return result + "\n</div>";
};

function Table(tableData) {
    this.isArray = false;
    this.tableData = tableData;
    if(tableData instanceof Array) {
        this.isArray = true;
    }
}

Table.prototype.render = function() {
    var result = "<table>\n  <thead>\n    <tr>";
    if(this.isArray) {
        tableData[0].forEach(function(header){
            result += "\n      <th>" + header + "</th>";
        });
        result += "\n    </tr>\n  </thead>";
        result+="\n  <tbody>";
        for(var i = 1; i < tableData.length; i++) {
            result += "\n    <tr>";
            tableData[i].forEach(function(value){
                result += "\n      <td>" + value + "</td>";
            });
            result += "\n    </tr>";
        }
        result += "\n  </tbody>\n</table>";
        return result;
    } else {
        var numberOfKeys = Object.keys(tableData).length;

        for(var property in tableData) {
            result += "\n      <th>" + property + "</th>";
        }
        result += "\n    </tr>\n  </thead>";
        result+="\n  <tbody>";

        for(var i = 0; i <= numberOfKeys; i++) {
            result += "\n    <tr>";
            for(var property in tableData) {
                    result += "\n      <td>" + tableData[property][i] + "</td>";
            }
            result += "\n    </tr>";
        }
        result+="\n  </tbody>\n</table>";
        return result;
    }
};

function Page(elements) {
    this.elements = [elements];
}

Page.prototype.render = function() {
    this.elements.forEach(function (element) {
        console.log(element.render());
    });
};

var div = new Div();
div.addChild(new Paragraph("I am inside that div"));
div.addChild(new Paragraph("I am inside that div too"));
console.log(div.render());

var div = new Div();
console.log(div.render() === "<div></div>");

var div1 = new Div();
var div2 = new Div();

div1.addChild(div2);

console.log(div1.render());
console.log();

var tableData = {
  "name": ["Ivo", "Rado", "Maria"],
  "age": [22, 24, 22]
};

var tableData = [ ["name", "age"], ["Ivo", 22], ["Rado", 24], ["Maria", 22] ];

var table = new Table(tableData);
console.log(table.render());

var p = new Paragraph("Rolling in the deep");
var div = new Div();
div.addChild(new Div());
div.addChild(new Div());
div.addChild(p);

var page = new Page(div);

page.render()
