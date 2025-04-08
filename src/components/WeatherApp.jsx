import React, { useState } from 'react';
import '../App.css';

const WeatherApp = () => {
    const [inputLocation, setInputLocation] = useState('');
    const [weatherData, setWeatherData] = useState({
        location: '',
        clouds: '...',
        humidity: '...',
        maxTemp: '...',
        minTemp: '...',
        temp: '...',
        wind: '...',
    });

    const options = {
        method: "GET",
    };

    const handleSearch = () => {
        if (!inputLocation) {
            alert("Please enter a city name.");
            return;
        }

        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=${apiKey}&units=metric`;

        fetch(apiUrl, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setWeatherData({
                    location: inputLocation,
                    clouds: data.clouds ? data.clouds.all : 'N/A',
                    humidity: data.main ? data.main.humidity : 'N/A',
                    maxTemp: data.main ? data.main.temp_max : 'N/A',
                    minTemp: data.main ? data.main.temp_min : 'N/A',
                    temp: data.main ? data.main.temp : 'N/A',
                    wind: data.wind ? data.wind.speed : 'N/A',
                });
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert("Failed to fetch weather data. Please try again later.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="App-name">
                Forecast <img className="Weather-gif" src="/Weather.gif" alt="" />
            </h1>
            <div id="Search-id" className="Search-part">
                <input
                    type="search"
                    id="City-name"
                    className="Search-input"
                    placeholder="Enter your City"
                    value={inputLocation}
                    onChange={(e) => setInputLocation(e.target.value)}
                />
                <button id="search-btn-id" className="Search-btn" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div id="Main-box-id" className="Main-BOX">
                <h2 id="Location-name">{weatherData.location}</h2>
                <img src="/Location1.png" alt="Location Icon" id="Location-png" />
                <h4 className="Cloud-head">Clouds: <p id="Clouds" style={{ display: 'inline-flex', paddingLeft: '5px' }}>{weatherData.clouds}</p></h4>
                <h4 id="Weather-id" className="Weather-head">Humidity: <p id="Weather" style={{ display: 'inline-flex' }}>{weatherData.humidity}</p></h4>
                <h4 className="max-tempid">max_temp: <p id="max-temp" style={{ display: 'inline-flex' }}>{weatherData.maxTemp}</p></h4>
                <h4 className="min-temp">min_temp: <p id="min_tempid" style={{ display: 'inline-flex' }}>{weatherData.minTemp}</p></h4>
                <div id="Temp-id" className="temp">
                    <h4 id="Temp-idhead">{weatherData.temp} &deg;C</h4>
                </div>
                <div className="Wind-speed">
                    <h5 style={{ paddingRight: '10px' }} className="Wind-class">Wind Speed: </h5>
                    <p id="Wind-id">{weatherData.wind}</p>
                    <h6 style={{ paddingLeft: '7px', paddingTop: '2px' }}>Km/hr</h6>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;