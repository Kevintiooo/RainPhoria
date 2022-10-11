const app = document.querySelector('.weather_app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const precipitationOutput = document.querySelector('.precipitation');
const pressureOutput = document.querySelector('.pressure');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "Jakarta";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        //Fetch fata from API
        fetchWeatherData();
        //Fade out the app
        app.style.opacity = "0";
    });
})

//Function submit event
form.addEventListener('submit', (e) => {
    if(search.value.length == 0){
        alert('Please type in a city');
    }
    else{
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0"
    }

    e.preventDefault();
});

// Function to return day
function dayOfTheWeek(day, month, year){
    const weekday = [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday" , "Sunday" 
    ];

    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

// Function to take and display the data from API
function fetchWeatherData(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=1bd0ac8e04ff427b8a7164308221010&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Temperature and weather 
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML =data.current.condition.text;

        // Date and Time from city
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        // New Date Format
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} / ${m} / ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;

        // Get icon for every weather
        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64".length);
        icon.src = "./icons/" + iconId;

        // Display Weather Detail
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + " km/h";
        precipitationOutput.innerHTML = data.current.precip_mm + " mm";
        pressureOutput.innerHTML = data.current.pressure_in + " in";

        // Default time
        let timeOfDay = "day";

        // Id for each weather condition
        const code = data.current.condition.code;

        // Day on the city (night)
        if(!data.current.is_day){
            timeOfDay = "night";
        }

        // Set backgroud with condition
        // Clear
        if(code == 1000){
            app.style.backgroundImage = `url(images/${timeOfDay}/clear.jpg)`;
      
            btn.style.background = "#e5ba92";
            if(timeOfDay == 'night'){
                btn.style.background = "#181e27"
            }
        }

        // Cloudy
        else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1135 
        ){
            app.style.backgroundImage = `url(images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#FFBE5D";
            if(timeOfDay == 'night'){
                btn.style.background = "#181e27"
            }
        }

        // Rain
        else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252 
        ){
            app.style.backgroundImage = `url(images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if(timeOfDay == 'night'){
                btn.style.background = "#7A295E"
            }
        }

        // Thunder
        else if(
            code == 1087 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282 
        ){
            app.style.backgroundImage = `url(images/${timeOfDay}/thunder.jpg)`;
            btn.style.background = "#332626";
            if(timeOfDay == 'night'){
                btn.style.background = "#332626"
            }
        }

        // snow
        else {
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if(timeOfDay == 'night'){
                btn.style.background = "#1b1b1b"
            }
        }
        app.style.opacity = "1";
    })

    .catch(() => {
        alert('City not found');
        app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";