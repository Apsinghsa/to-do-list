
let inputField = document.querySelector("input");

inputField.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    addTask();
  }
});



function render() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            let taskList = document.querySelector("#task-list");
            taskList.innerHTML = "";

            tasks.forEach(task => {
                let listElement = document.createElement("li");
                let elementSpan = document.createElement("span");
                let deleteTaskButton = document.createElement("button");

                let taskName = document.createTextNode(task.taskname);
                elementSpan.appendChild(taskName);

                deleteTaskButton.innerText = "X";
                deleteTaskButton.onclick = () => deleteTask(task.taskid);
                elementSpan.appendChild(deleteTaskButton);
                listElement.appendChild(elementSpan);
                taskList.appendChild(listElement);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function addTask() {
    let taskName = document.querySelector("input").value;
    if (taskName.trim() === "") return;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskname: taskName }),
    })
    .then(response => {
        if (response.ok) {
            render();
        } else {
            console.error('Error adding task:', response.statusText);
        }
    })
    .catch(error => console.error('Error adding task:', error));
    document.querySelector("input").value = "";
}

function deleteTask(taskid) {
    fetch(`/tasks/${taskid}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            render(); 
        } else {
            console.error('Error deleting task:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting task:', error));
}

window.onload = () => {
    render();
};