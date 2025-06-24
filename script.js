let i = 1;

function addTask(){
    let inputtaskName = document.querySelector("input").value;
    let taskno = i
    const taskdiv = document.createElement("div");
    // taskdiv.id = "todo-"+taskno;
    taskdiv.setAttribute("id", "todo-"+taskno);


    // //easier
    // // taskdiv.innerHTML = taskno+". "+inputtaskName+ "<button onclick=deleteTask("+taskno+")>delete</button>"
    // taskdiv.innerHTML = inputtaskName+ "<button onclick=deleteTask("+taskno+")>delete</button>";

    //advanced
    const taskname = document.createTextNode(taskno+". "+inputtaskName);
    taskdiv.appendChild(taskname);

    const button = document.createElement("button");
    button.onclick = () => deleteTask(taskno);
    button.innerText = "delete task";
    taskdiv.appendChild(button);



    document.querySelector("#task-list").appendChild(taskdiv);

    document.querySelector("input").value = ""
    i++;
}

function deleteTask(n){
    let tasktodelete = document.querySelector("#todo-"+n);
    tasktodelete.remove();
    i--;
}