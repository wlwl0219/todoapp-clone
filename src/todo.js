const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = "PENDING";
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentNode;
    todoList.removeChild(li);
    toDos = toDos.filter(function (toDo) {
        return toDo.id !== Number(li.id);
    });
    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    const newId = Math.floor(Math.random() * 1000000000) + 1;
    delBtn.className = "far fa-trash-alt";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
    const toDoObj = {
        id: newId,
        text: text
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (ele) {
            paintToDo(ele.text);
        });
    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();