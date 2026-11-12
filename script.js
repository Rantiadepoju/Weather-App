const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchBtn');
const apiKey = 'b8478f9728fd6fda77b157262a9449d1';


cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.value()
    }
})

// async function getFetchData(endPoint, city) {
//     // Implementation for fetching weather data
//     const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

//     const response = await fetch(apiUrl);

//     return response.json();
// }

// async function updateWeatherInfo(city) {
//     const weatherData =  await getFetchData('weather', city);
//     console.log(weatherData);
// }



async function getWeather(city) {
  document.querySelector(".search-city").style.display = "none";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`City not found or bad request (status ${response.status})`);
    }

    const data = await response.json();
    console.log(data); // this is what you should see in the console
    const result = document.getElementById("result");
    const cityLocalDate = new Date((data.dt + data.timezone) * 1000);
    const cityLocalDateTime = cityLocalDate.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC"
    });

result.innerHTML = `
  <h2>${data.name}, ${data.sys.country}</h2>
  <p>Local date and time: ${cityLocalDateTime}</p>
  <p>${Math.round(data.main.temp)}°C</p>
  <p>${data.weather[0].description}</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind: ${data.wind.speed} m/s</p>
  <p>Pressure: ${data.main.pressure} hPa</p>
`;
    // document.getElementById("result").textContent =
    //   `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
  } catch (error) {
    console.error("Error:", error );
  }
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  console.log("Searching for:", city); // proves the click works
  if (city) getWeather(city);
});