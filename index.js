function deleteFromQueue(){
    target.parentNode.remove()
}
function createDone(text){
    const body = document.body;
    const doneContainer = document.createElement("div");
    const headLine = document.createElement("h1");
    const clearALL = document.createElement("button")
    clearALL.className ="clearAll"
    clearALL.innerText ="CLEAR LIST"
    headLine.innerText = "DONE";
    doneContainer.className = "Done";
    body.append(doneContainer);
    doneContainer.append(headLine);
    body.append(clearALL)
    addFinished(text)
}
function addFinished(text){
    const doneSection = document.createElement("section");
    const doneTask = document.createElement("p");
    const doneDeleteButton = document.createElement("button");
    const doneContainer = document.querySelector(".Done")
    doneSection.className ="finished"
    doneTask.className = "finishedtask"
    doneTask.innerText = text
    doneDeleteButton.className = "donedeleteButton"
    doneDeleteButton.innerText = "DELETE"
    doneContainer.append(doneSection)
    doneSection.append(doneTask,doneDeleteButton)
}
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

localStorage.removeItem("--ml-is-active")

document.addEventListener("DOMContentLoaded",()=>{
    for (const [key,value] of Object.entries(localStorage)){
        // console.log(key,value)
        if (value == "false") {
            addTask(key)
            console.log(key,"OFFEN")  
        }
        if (value == "true" && document.querySelector(".Done")){
            addFinished(key)
            console.log(key,"ERLEDIGT!")   
        }else if(value == "true"){
            createDone(key)
            console.log(key,"DONE Angelegt")
        }
}})



// console.log(localStorage)
// localStorage.setItem("key","value")
// console.log(localStorage.getItem("key"))
// localStorage.removeItem("Stulle")
// console.log(localStorage)
// localStorage.setItem("Stulle","Käse")
// localStorage.setItem("Einkaufen",false)
// localStorage.setItem("Codewars",true)
// console.log(localStorage)
// localStorage.clear()
// console.log(localStorage)


// const textInput = document.querySelector(".taskInput")
// const addButton = document.querySelector(".addButton")
// addButton.addEventListener("click",()=>{
//     console.log(textInput.value);
//     addTask(textInput.value);
//     textInput.value = "";
// })

const textInput = document.querySelector(".taskInput")
const addButton = document.querySelector(".addButton")
addButton.addEventListener("click",()=>{
    addTask(textInput.value);
    localStorage.setItem((textInput.value.trim()),"false");
    textInput.value = "";
})






document.querySelector(".toDo").addEventListener("click", function(event) {
    const target = event.target;
    //CHECKBOX
    if (target.className == "checkbox"){
        console.log("Task finished");
        console.log(target.parentNode.children[1].innerText);
        const currentText = target.parentNode.children[1].innerText;
        currentText.trim()
        localStorage.removeItem(currentText)
        localStorage.setItem(currentText,"true")
        if (document.querySelector(".Done")){
            console.log("done exists")
            addFinished(currentText)
        }else{
            console.log("done does NOT exists")
            createDone(currentText)
        }
        target.parentNode.remove()
    }
    //EDIT
    if (target.className == "editButton"){
        console.log("Edit Task");
        console.log(target.parentNode.children[1].innerText);
        const currentText = target.parentNode.children[1].innerText
        currentText.trim()
        localStorage.removeItem(currentText)
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
    //SAVE
    if (target.className == "saveButton"){
        console.log("save Task")
        const currentInput = target.parentNode.children[1]
        const newText = target.parentNode.children[1].value;
        newText.trim()
        console.log(newText)
        localStorage.setItem(newText,"false") 
        const editedText = document.createElement("p");
        const newEditButton = document.createElement("button");

        currentInput.replaceWith(editedText);
        editedText.innerText =newText;
        editedText.className = "task";
        target.replaceWith(newEditButton);
        newEditButton.className = "editButton";
        newEditButton.innerText = "EDIT";
    }
    //DELETE
    if (target.className == "deleteButton") {
        localStorage.removeItem(target.parentNode.children[1].innerText)
        console.log(target.parentNode.children[1].innerText)
        target.parentNode.remove()
        console.log("Task deleted");
    }
});

function deleteDone(){
    document.querySelector(".Done").addEventListener("click",(e)=>{
       const target = e.target;
       if (target.className == "donedeleteButton") {
        localStorage.removeItem(target.parentNode.children[0].innerText)
        target.parentNode.remove()
        console.log("Delete finished")
       }
    })
}
document.body.addEventListener("click",()=>{
    document.querySelector(".Done") ? deleteDone() : null
})

document.body.addEventListener("click",(e)=>{
    // console.log(e)
    if (e.target.className == "clearAll") {
        localStorage.clear()
        console.log("Local Storage Cleared")
        location.reload();
       }
})
// if (document.querySelector(".Done")){
//     console.log("YAHOOOOOOOOOOO")
//     document.querySelector(".Done").addEventListener("click", function(event) {
//         const target = event.target;
//         // const delButton = document.querySelector(".deleteButton")
//         // const edBtn = document.querySelector(".editButton")
//         // const checker = document.querySelector(".checkbox")
    
//         if (target.className == "donedeleteButton") {
//             console.log("Delete finished")
//             // target.parentNode.remove()
//             // console.log(target.parentNode)
//             // console.log("Task deleted");
//         }
//     });
// }
