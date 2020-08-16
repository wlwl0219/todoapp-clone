const COORDS = "coords";
const API_KEY = "b2ef341d4ad7215c261d45b188f19a66"; // 오픈웨덜맵
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
    // 위도와 경도를 활용해 날씨 API로 날씨와 온도 등 다양한 정보를 얻을 수 있다.
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then((response) => response.json())
        .then((json) => {
            const temp = json.main.temp;
            const place = json.name;
            weather.textContent = `${temp} @${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    // 현재 포지션을 가지고 위도와 경도를 추출
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    }; // 객체의 키이름과 변수이름을 같게 저장할때는 위와 같이 할 수 있음
    console.log(coordsObj);
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("안돼!!");
}

function askForCoords() {
    // 현재 포지션을 가지고옴
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
    setInterval(loadCoords, 60000);
}

init();