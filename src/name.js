const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    name = document.querySelector(".js-name");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// 폼이벤트가 일어나면 처음껀 지우고 
// 이름을 html과 로컬스토리지에 저장 한다.
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    localStorage.setItem(USER_LS, currentValue);
}

// 인풋폼을 지우고 이름엘리먼트의 
// 클래스와 텍스트를 추가한다.
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    name.classList.add(SHOWING_CN);
    name.textContent = `Hello ${text}`;
}

// 이름이 없으니 인풋폼을 보여지게 하고 이벤트를 추가한다
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// 로컬스토리에 있다면 이름이 보여지고 없다면 인풋이 보여진다.
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();