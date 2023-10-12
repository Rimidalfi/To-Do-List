const docBody = document.body;
const toDoContainer = document.querySelector(".toDo");

function newElement(eTag,eClassName,eInnerText="",eType="",eId=""){
    const element = document.createElement(eTag);
    element.className = eClassName;
    element.id = eId;
    element.innerText = eInnerText;
    element.type = eType;
    return element;
  }
function createDone(text){
    const doneContainer = newElement("div","Done");
    const headLine = newElement("h1","toDoh1","Done")
    const clearALL = newElement("button","clearAll","CLEAR LIST")
    docBody.append(doneContainer);
    doneContainer.append(headLine);
    docBody.append(clearALL)
    addFinished(text)
}
function addFinished(text){
    const doneContainer = document.querySelector(".Done")
    const doneSection = newElement("section","finished");
    const doneTask = newElement("p","finishedtask",text);
    const doneDeleteButton = newElement("button","donedeleteButton","DELETE");
    doneContainer.append(doneSection)
    doneSection.append(doneTask,doneDeleteButton)
}
function addTask(description){
    const newSection = newElement("section","queue");
    const newCheckBox = newElement("input","checkbox","","radio");
    const newTask = newElement("p","task",description);
    const buttonContainer = newElement("div","buttonContainer");
    const editButton = newElement("button","editButton","EDIT");
    const deleteButton = newElement("button","deleteButton","DELETE");
    toDoContainer.append(newSection)
    buttonContainer.append(editButton,deleteButton)
    newSection.append(newCheckBox,newTask,buttonContainer)
}
function deleteDone(){
    document.querySelector(".Done").addEventListener("click",(e)=>{
       const target = e.target;
       if (target.className == "donedeleteButton") {
        localStorage.removeItem(target.parentNode.children[0].innerText)
        target.parentNode.remove()
       }
    })
}
//LOAD LOCAL STORAGE
document.addEventListener("DOMContentLoaded",()=>{
    localStorage.removeItem("--ml-is-active")
    for (const [key,value] of Object.entries(localStorage)){
        if (value == "false") {
            addTask(key)
        }
        if (value == "true" && document.querySelector(".Done")){
            addFinished(key)
        }else if(value == "true"){
            createDone(key)
        }
}})
//ADD
const textInput = document.querySelector(".taskInput")
const addButton = document.querySelector(".addButton")
addButton.addEventListener("click",()=>{
    addTask(textInput.value.trim());
    localStorage.setItem((textInput.value.trim()),"false");
    textInput.value = "";
})
document.querySelector(".toDo").addEventListener("click", function(event) {
    const target = event.target;
    //CHECKBOX
    if (target.className == "checkbox"){
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
        const currentText = target.parentNode.parentNode.children[1].innerText
        const currentTask = target.parentNode.parentNode.children[1];
        const newInput = newElement("input","editTask");
        currentTask.replaceWith(newInput);
        newInput.value = currentText
        const saveButton = newElement("button","saveButton","SAVE");
        target.replaceWith(saveButton);
        localStorage.removeItem(currentText)
    }
    //SAVE
    if (target.className == "saveButton"){
        const currentInput = target.parentNode.parentNode.children[1]
        let newText = target.parentNode.parentNode.children[1].value.trim();
        const editedText = newElement("p","task",newText);
        const newEditButton = newElement("button","editButton","EDIT");
        currentInput.replaceWith(editedText);
        target.replaceWith(newEditButton);
        localStorage.setItem(newText,"false") 
    }
    //DELETE
    if (target.className == "deleteButton") {
        localStorage.removeItem(target.parentNode.parentNode.children[1].innerText)
        target.parentNode.parentNode.remove()
    }
});
//DELETE DONE
document.body.addEventListener("click",()=>{
    document.querySelector(".Done") ? deleteDone() : null
})
// CLEAR ALL
document.body.addEventListener("click",(e)=>{
    if (e.target.className == "clearAll") {
        localStorage.clear()
        location.reload();
       }
})