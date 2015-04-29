'use strict'

$(document).ready(function($) {
	$("#task-form").submit(function(event) {
		var task = $("#task-name").val();
		$("#task-name").val('');

		TodoApp.addTask(task);
		TodoApp.displayList();
		TodoApp.finishTask();

		event.preventDefault();
	});
});