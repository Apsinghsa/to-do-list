function addTask(){
    let taskName = document.querySelector("input").value;
    let taskID = "taskid"+Date.now();
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("id", taskID);

    let taskNameElement = document.createTextNode(taskName);
    taskDiv.appendChild(taskNameElement);

    let deleteButton = document.createElement("button");
    deleteButton.onclick = ()=>deleteTask(taskID);
    deleteButton.innerText = "delete task";
    taskDiv.appendChild(deleteButton);

    document.querySelector("#task-list").appendChild(taskDiv);

    document.querySelector("input").value = "";
}

function deleteTask(taskID){
    let taskToDelete = document.querySelector("#"+taskID);
    taskToDelete.remove();
}