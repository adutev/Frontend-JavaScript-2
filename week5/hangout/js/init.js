'use strict'

$(document).ready(function($) {
	$("ul#tasks-list").sortable();
	$("#new-task-form").submit(function() {
		var taskName = $("#task-name").val();
		$("#task-name").val('');

		TodoApp.addTask(taskName);
		TodoApp.displayList();
		TodoApp.finishTask();
		event.preventDefault();
	})
});

