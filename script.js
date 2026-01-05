const input = document.getElementById('city-input');
const button = document.getElementById('get-weather');
const output = document.getElementById('weather-output');
const API_KEY = 'cdbe58aaa99a54f441dbed92c94a351e';

async function getWeather() {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${API_KEY}&units=imperial`
    );

    const data = await response.json();
    console.log(data);
}

getWeather();

button.addEventListener('click', async () => {
    const city = input.ariaValueMax.trim();
    if (!city) return;

    try {
        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial');
        const data = await res.json();

        if (data.cod !== 200) {
            output.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        output.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} mph</p>
            `;
    } catch (error) {
        output.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        console.error(err);
    }
});