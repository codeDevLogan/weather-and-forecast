const myWeatherKey = '7c595b9c2a826cc8f93da7b893dfce75';
const $cityName = $('#cityName');
const $cityFormEl = $('#cityForm')
const $todaysWeather = $('#todaysWeather');
const $weatherTitle = $('#weatherTitle');
const $prevSearchBtns = $('#prev-search-buttons')
const $weatherIcon = $('#weatherIcon');
const $btnDiv = $('#btnDiv');
let prevSearches = [];

let cityName = '';
let lat = '';
let longi = '';

const showButtons = () => {
    for(let i = 0; i < prevSearches.length; i++){
        $(`.btn`).remove();
    }
    for(let i = 0; i < prevSearches.length; i++){
        $prevSearchBtns.append(`<button class="btn"><p>${prevSearches[i]}<p></ button>`)
    }
    $btnDiv.attr('class', 'card d-flex')
}


const formSubmit = (event) => {
    event.preventDefault();
    
    cityName = $cityName.val();
    if(cityName){
        getCoords(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${myWeatherKey}`)
        
        $cityName.value = '';
    }else{
        alert('Please Enter a City.');
    }
    
}

const oldSearch = (event) => {
    event.preventDefault();
    
    cityName = $(event.target).children("p").val();
    
    if(cityName){
        getCoords(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${myWeatherKey}`)
    }else{
        alert('Please Click a Previously Searched City.');
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
        iconCaller = data.weather[0].icon;
        iconImgUrl = `http://openweathermap.org/img/wn/${iconCaller}@2x.png`
        $todaysWeather.text(data.weather[0].description);
        $weatherIcon.attr('src', iconImgUrl);
        prevSearches.push(cityName);
        localStorage.setItem('prevSearches', JSON.stringify(prevSearches));
        showButtons();
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

if(JSON.parse(localStorage.getItem('prevSearches'))){
    prevSearches = JSON.parse(localStorage.getItem('prevSearches'));
    showButtons();
}

$cityFormEl.on('submit', formSubmit);
$prevSearchBtns.on('click', oldSearch)
