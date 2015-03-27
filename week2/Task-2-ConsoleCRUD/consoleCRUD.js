var prompt = require('prompt');


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
    } else if(result.command === 'quit') {
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
                id:result.id,
                name: result.name,
                email: result.email
            }
    table.push(newUser);
    getCommand();
  });
}

function invalidCommand() {
    console.log('Invalid command!');
    getCommand();
}
getCommand();