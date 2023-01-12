const myWeatherKey = '7c595b9c2a826cc8f93da7b893dfce75';
const $cityName = $('#cityName');
const $cityFormEl = $('#cityForm')
const $todaysWeather = $('#todaysWeather');
const $weatherTitle = $('#weatherTitle');
let lat = '';
let longi = '';

const formSubmit = (event) => {
    event.preventDefault();

    let cityName = $cityName.val();
    if(cityName){
        getCoords(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${myWeatherKey}`)

        $cityName.value = '';
    }else{
        alert('Please Enter a City.');
    }

}


let getCoords = (weatherApiUrl) => {
    fetch(weatherApiUrl)
    .then(function (response){
        return response.json();
    }).then(function(data) {
        lat = data[0].lat;
        longi = data[0].lon;
        displayWeather();
        displayForecast();
    })
}

let displayWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&units=imperial&appid=${myWeatherKey}`)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        iconCaller = data.weather[0].icon;
        iconImgUrl = `http://openweathermap.org/img/wn/${iconCaller}@2x.png`
        $todaysWeather.text(data.weather[0].description);
        $weatherTitle.append($(`<img src=${iconImgUrl}></img>`))
    });
}
let displayForecast = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${longi}&units=imperial&appid=${myWeatherKey}`)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}

$cityFormEl.on('submit', formSubmit);
