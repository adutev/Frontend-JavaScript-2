window.onload = function() {
  var button = document.getElementById("add-task-button");
  var list = document.getElementById("list");

  button.onclick = function(event) {
      var input = document.getElementById("task-input");
      var task = document.createElement("li");
      task.appendChild(document.createTextNode(input.value));
      list.appendChild(task);
      input.value = '';
  };
};