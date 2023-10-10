document.querySelector(".toDo").addEventListener("click", function(event) {
    const target = event.target;
    const delButton = document.querySelector(".deleteButton")
    const edBtn = document.querySelector(".editButton")
    const checker = document.querySelector(".checkbox")

    if (target.className == "checkbox"){
        console.log("Task finished")
        
    }

    if (target.className == "editButton"){
        console.log("Edit Task");
        console.log(target.parentNode.children[1].innerText);
        const currentText = target.parentNode.children[1].innerText
        const newInput = document.createElement("input");
        const currentTask = target.parentNode.children[1];
        currentTask.replaceWith(newInput);
        newInput.value = currentText

        const saveButton = document.createElement("button");
        target.replaceWith(saveButton);
        saveButton.className ="saveButton";
        saveButton.innerText = "SAVE";
        console.log(saveButton);
    }
    if (target.className == "saveButton"){
        console.log("save Task")
        // console.log(target.parentNode.children[1].value)
        const currentInput = target.parentNode.children[1]
        const newText = target.parentNode.children[1].value; 
        const editedText = document.createElement("p");
        const newEditButton = document.createElement("button");

        currentInput.replaceWith(editedText);
        editedText.innerText =newText;
        editedText.className = "task";
        target.replaceWith(newEditButton);
        newEditButton.className = "editButton";
        newEditButton.innerText = "EDIT";
    }

    if (target.className == "deleteButton") {
        target.parentNode.remove()
        console.log(target.parentNode)
        console.log("Task deleted");
    }
});


function addTask(description){
    const toDoContainer = document.querySelector(".toDo");
    const newSection = document.createElement("section");
    const newCheckBox = document.createElement("input");
    const newTask = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    newSection.className ="queue"
    newCheckBox.type = "checkbox"
    newCheckBox.className = "checkbox"
    newTask.className = "task"
    newTask.innerText = description
    editButton.className = "editButton"
    editButton.innerText = "EDIT"
    deleteButton.className = "deleteButton"
    deleteButton.innerText = "DELETE"
    
    toDoContainer.append(newSection)
    newSection.append(newCheckBox,newTask,editButton,deleteButton)
}

    const textInput = document.querySelector(".taskInput")
    const addButton = document.querySelector(".addButton")
    
    addButton.addEventListener("click",()=>{
        console.log(textInput.value);
        addTask(textInput.value);
        textInput.value = "";

    })
