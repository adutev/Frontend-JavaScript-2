var prompt = require('prompt');
var jf = require('jsonfile')
var file = 'data/users.json';
var util = require('util')
var Table = require('cli-table');
var chalk = require('chalk');

var table = [
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
	console.log("commands | 'add', 'get', 'delete', 'list', 'search', 'save', 'load', 'quit' |");
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
    } else if(result.command === 'load') {
        loadFromFile();
    } else if(result.command === 'quit') {
        console.log('Quitting now');
    } else {
        invalidCommand();
    }
  });
}

function printTable() {
	var tableToPrint = new Table({
	    head: ['ID', 'Name', 'Email']
	});

    for(var row in table) {
		var rowToPush = [];
		for(var col in table[row]){
			switch(col) {
				case 'id':
					rowToPush.push(chalk.yellow(table[row][col]));
					break;
				case 'name':
				rowToPush.push(chalk.blue(table[row][col]));
					break;
				case 'email':
					rowToPush.push(chalk.green(table[row][col]));
					break;
			}
		}
		tableToPrint.push(rowToPush);
	}

	console.log(tableToPrint.toString());

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
    	var tableToPrint = new Table({
		    head: ['ID', 'Name', 'Email']
		});
        for(var row in table){
            if(table[row][result.key] == result.value){
            	var rowToPush = [];
            	for(var col in table[row]) {
            		rowToPush.push(table[row][col]);
            	}
            	tableToPrint.push(rowToPush);
                console.log(tableToPrint.toString());
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

function loadFromFile () {
	try {
		table = jf.readFileSync("data/users.json");
	} catch(err) {
		console.log(err);
	}

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