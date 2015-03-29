var prompt = require('prompt');
var jf = require('jsonfile')
var util = require('util')
 
var file = 'data/users.json';

var table = [
    {
        id:'ID',
        name: 'Name',
        email: 'EMail'
    },
    {
        id: 123,
        name: 'John',
        email: 'J@D.com'
    },
    {
        id: 456,
        name: 'Mimi',
        email: 'J@D.com'
    }]

prompt.start();

function getCommand () {
  prompt.get([
  {
    name: 'command'
  }], function (err, result) {
    if(result.command === 'list') {
        printTable();
    } else if(result.command === 'add') {
        addUser();
    } else if(result.command === 'get') {
        getRow();
    } else if(result.command === 'delete') {
        removeElement();
    } else if(result.command === 'search') {
        searchUser();
    } else if(result.command === 'save') {
        saveToJson();
    }
    else if(result.command === 'quit') {
        console.log('Quitting now :(')
    } else {
        invalidCommand();
    }
  });
}

function printTable() {
    var result = ''
    for(var row in table){
        for(var col in table[row]){
            result += '|' + (table[row][col]);            
        }
        result += '|\n';
    }
    console.log(result);
    getCommand();
}

function addUser () {
    prompt.get(['id','name','email'], function (err, result) {
        var newUser = 
            {
                "id":result.id,
                "name": result.name,
                "email": result.email
            }
    table.push(newUser);
    getCommand();
  });
}

function getRow () {
    prompt.get(['key', 'value'], function (err, result) {
        for(var row in table){
            if(table[row][result.key] == result.value){
                console.log(JSON.stringify(table[row]));
                break;
            }
        }
        getCommand();
    })
}

function saveToJson() {
    jf.writeFile(file, table);
    getCommand();
}

function removeElement() {
    prompt.get(['key', 'value'], function (err, result) {
        for(var row in table){
            if(table[row][result.key] == result.value){
                var index = table.indexOf(table[row]);
                table.splice(index, 1);
                break;
            }
        }
        getCommand();
    })
}

function searchUser () {
    prompt.get(['value'], function (err, result) {
        for(var row in table){
            var row = JSON.stringify(table[row]);
            if(row.indexOf(result.value) > -1){
                console.log(row);
            }
        }
        getCommand();
    })
}

function invalidCommand() {
    console.log('Invalid command!');
    getCommand();
}
getCommand();