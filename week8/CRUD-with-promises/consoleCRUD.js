var prompt = require('prompt');
var jf = require('jsonfile')
var file = 'data/users.json';
var util = require('util')
var Table = require('cli-table');
var chalk = require('chalk');
var Q = require('q');

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
    }];




prompt.start();

var getCommand = function() {
    console.log("commands | 'add', 'get', 'delete', 'list', 'search', 'save', 'load', 'quit' |");
    var deferred = Q.defer();
    prompt.get([
        {
        name: 'command'
    }], function (err, result) {
        deferred.resolve(result.command);
      });

    return deferred.promise;
};

function proceedCommand (command) {
    switch(command){
        case 'list':
            printTable();
            break;
        case 'add':
            addUser();
            break;
        case 'get':
            getRow();
            break;
        case 'delete':
            removeElement();
            break;
        case 'search':
            searchUser();
            break;
        case 'save':
            saveToJson();
            break;
        case 'load':
            loadFromFile();
            break;
        case 'quit':
            console.log('Quitting now...');
            break;
        default:
            invalidCommand();
            break;
    }
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
    initPrompt();
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
    initPrompt();
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
        initPrompt();
    })
}

function saveToJson() {
    jf.writeFile(file, table);
    initPrompt();
}

function loadFromFile () {
	try {
		table = jf.readFileSync("data/users.json");
	}
    catch(err) {
		console.log(err);
	}

	 initPrompt();
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
        initPrompt();
    })
}

function searchUser () {
    prompt.get(['value'], function (err, result) {
        for(var r in table){
            var row = JSON.stringify(table[r]);
            if(row.indexOf(result.value) > -1){
                console.log(row);
            }
        }
        initPrompt();
    });
}

function invalidCommand() {
    console.log('Invalid command!');
    initPrompt();
}

var initPrompt = function () {
    return getCommand()
        .then(proceedCommand);
}

initPrompt();
