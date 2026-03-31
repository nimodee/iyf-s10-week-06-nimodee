 const API_KEY = "b295805b7dd66b6ed61d409abac7e3a8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

// Elements to update
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents the page from reloading
    const city = cityInput.value.trim(); // get the city name from input

    if (city) {
        getWeather(city);     
    }
});


 async function getWeather(city) {
    const url = '${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric';
    
    try {
        showLoading();    
        hideError();     
        
        const response = await fetch(url);  
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }
            throw new Error("Failed to fetch weather data");
        }
        
        const data = await response.json();
        displayWeather(data);             
        saveToHistory(city);               
        
    } catch (err) {
        showError(err.message);            
    } finally {
        hideLoading();                      
    }
}
function displayWeather(data) {
    // Update main weather info
    cityName.textContent = '${data.name}, ${data.sys.country}';
    weatherIcon.src = 'https://openweathermap.org/img/wn/${data.weather[0].icon}.png';
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = 'Temperature: ${data.main.temp}°C';
    description.textContent = data.weather[0].description;
    
    // Update detailed weather info
    feelsLike.textContent = '${data.main.feels_like}°C';
    humidity.textContent = '${data.main.humidity}%';
    wind.textContent = '${data.wind.speed} m/s';
    pressure.textContent = '${data.main.pressure} hPa';
    
    // Make the weather display visible
    weatherDisplay.classList.remove("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");      // Show the loading message
    weatherDisplay.classList.add("hidden");  // Hide the weather display while loading
}

function hideLoading() {
    loading.classList.add("hidden");       // Hide the loading message
    weatherDisplay.classList.remove("hidden"); // Show the weather display
}

function showError(message) {
    error.textContent = message;        // Put the error message inside the error div
    error.classList.remove("hidden");   // Make sure the error div is visible
    weatherDisplay.classList.add("hidden"); // Hide the weather display when there's an error
}
 function hideError() {
    error.classList.add("hidden"); // Hides the error message
}

function saveToHistory(city) {
    // Get the current history from localStorage, or start with an empty array
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    // If the city already exists in history, remove it (so it will be added to the front)
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

    // Add the new city to the start of the array
    history.unshift(city);

    // Keep only the last 5 searches
    history = history.slice(0, 5);

    // Save back to localStorage
    localStorage.setItem("weatherHistory", JSON.stringify(history));

    // Update the displayed history on the page
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById("search-history");
    
    // Get history from localStorage or start with empty array
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    // Clear existing list
    historyList.innerHTML = "";

    // Add each city as a clickable item
    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            cityInput.value = city; // Set input to clicked city
            getWeather(city);       // Fetch weather for clicked city
        });
        historyList.appendChild(li);
    });
}

