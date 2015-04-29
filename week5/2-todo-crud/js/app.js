'use strict'

var TodoApp = (function() {
	var tasks = [];
	var taskIndex = 0;

	var addTask = function(taskName) {
		taskIndex++;

		tasks.push({
			name: taskName,
			id: taskIndex,
			finished: false
		});
	}

	var finishTask = function(id) {
		tasks.forEach(function(task, index) {
			if (task.id === id) {
				task.finished = !task.finished;
			}
		})
	}

	var deleteTask = function(id) {
		tasks.forEach(function(task, index) {
			if (task.id === id) {
				tasks.splice(index, 1);
			}
		})
	}

	var editTask = function() {
		$(".display").click(function(){
		    $(this).hide().siblings(".edit").show().val($(this).text()).focus();
		});

		$(".edit").focusout(function(){
		    $(this).hide().siblings(".display").show().text($(this).val());
		    var r = $(this).val();
		    console.log(r)
		    var id = $(this).parent().attr('id').replace('task-','');
		    tasks.forEach(function(task){
		    	if (task.id == id) {
		    		task.name = r;
				}
		    })
		    console.log(tasks)
		});
	}

	var displayList = function() {

		// Clean  the list
		var list = $("#list");
		list.empty();

		// Iterate over tasks
		tasks.forEach(function(task) {
			var taskName = '<span class="display">' + task.name + '</span>';
			var taskId = task.id;

			var li = $("<li ></li>", {
				id: "task-" + taskId
			});

			// Checkbox
			var checkBox = $('<input />', {
				type: "checkbox",
			});

			if (task.finished) {
				checkBox.attr({
					checked: 'checked'
				});
				li.addClass('finished');
			}
			checkBox.click(function() {
				finishTask(taskId);
				displayList();
			});

			// Delete button
			var deleteButton = $('<button>Delete task</button>');
			deleteButton.click(function() {
				deleteTask(taskId);
				displayList();
			});

			li.append(checkBox);
			li.append(taskName);
			li.append('<input class="edit" style="display:none"/>');
			li.append(deleteButton);
			list.append(li);
			editTask();
		});
	}

	return {
		addTask: addTask,
		finishTask: finishTask,
		displayList: displayList,
		deleteTask: deleteTask,
		editTask: editTask
	}
})();