const bodyImg = document.querySelector("body");
const IMG_NUMBER = 4;

function paintImage(imgNum) {
    const image = new Image();
    image.src = `img/${imgNum + 1}.jpg`
    image.classList.add("bgImage");
    bodyImg.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init()