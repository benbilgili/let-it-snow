import React, { useState, useEffect } from 'react';
import './App.css';
import Snowfall from 'react-snowfall'

function App() {
  const apiKey = '0b0e3d4b045d4ccab6090544230612';
  const cities = ['Edinburgh', 'Gothenburg', 'Berlin', 'Stockholm', 'New York', 'Oslo', 'London', 'Moscow', 'Vienna', 'Innsbruck', 'Vaduz'];
  const initialIndex = 0;

  const [weatherData, setWeatherData] = useState(null);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  async function getWeather(city) {
    try {
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Data: ", data)
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  function handleButtonClick() {
    setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    const currentCity = cities[currentCityIndex];
    getWeather(currentCity);

  }

  useEffect(() => {
    getWeather(cities[initialIndex]);
  }, []); 

  const bodyStyle = {
    backgroundColor: 'rgb(23, 40, 117)',
    color: 'white',
  };


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleButtonClick} style={buttonStyle}>Find Snow</button>
        {weatherData && (
          <div >
            <h2>Weather for {weatherData.location.name}</h2>
            <p>Weather: {weatherData.current.condition.text}</p>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            {weatherData.current.condition.text.toLowerCase().includes('snow') && (
              <>
              <Snowfall/>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};



export default App;
