const input = document.getElementById('city-input');
const button = document.getElementById('get-weather');
const output = document.getElementById('weather-output');
const API_KEY = 'cdbe58aaa99a54f441dbed92c94a351e';

// Function to fetch weather for a given city
async function getWeather(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
        const data = await res.json();

        if (data.cod !== 200) {
            output.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        output.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>🌡 Temperature: ${data.main.temp} °F</p>
            <p>☁️ Weather: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>💨 Wind Speed: ${data.wind.speed} mph</p>
        `;
    } catch (error) {
        output.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        console.error(error);
    }
}

// Event listener for button click
button.addEventListener('click', () => {
    const city = input.value.trim();  // Correct property to get input text
    if (!city) return;
    getWeather(city);  // Pass the city to the function
});

// Clear button
const clearButton = document.getElementById('clear-weather');

clearButton.addEventListener('click', () => {
    input.value = '';
    output.innerHTML = '<p>Enter a city and click "Get Weather"!</p>';
    input.focus();
});