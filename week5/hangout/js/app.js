'use strict'

var TodoApp = (function() {
	var tasks = [];
	var idIindex = 0;

	var addTask = function(taskName) {
		idIindex++;

		tasks.push({
			name: taskName,
			id: idIindex,
			finished: false
		});
	}

	var finishTask = function(id) {
		tasks.forEach(function(task, index) {
			if (task.id === id) {
				task.finished = !task.finished;
				tasks[index] = task;
			}
		})
	}

	var displayList = function() {

		var tasksList = $("#tasks-list");

		//clear the contents
		tasksList.empty();

		//loop trough the tasks
		tasks.forEach(function (task) {
			var taskId = task.id;
			var taskName = task.name;
			var liTask = $("<li></li>", {
				id: "task-" + taskId
			});

			var chkTaskFinish = $("<input />", {
				type: "checkbox",
			});

			if(task.finished) {
				chkTaskFinish.attr("checked", "checked");
				liTask.addClass('finished');
			}

			chkTaskFinish.click(function() {
				finishTask(taskId);
				displayList();
			});

			liTask.append(chkTaskFinish);
			liTask.append(taskName);

			tasksList.append(liTask);
		})
	}

	return {
		addTask: addTask,
		finishTask: finishTask,
		displayList: displayList
	}
})();