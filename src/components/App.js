
import { useState, useRef } from 'react';
import React from "react";
import './../styles/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  const weatherRef = useRef('')

  function handleSubmit(e){
    e.preventDefault()
    let val = weatherRef.current.value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=de90fadc17a8c3531280d3a786567ce6`)
    .then(res => res.json())
    .then(data => {
      setWeatherData(data)
      setLoading(false)
    })
    .catch(error => console.log('error', error))

    weatherRef.current.value = ''
  }
  return (
    <div className='main'>
        <form onSubmit={handleSubmit}>
          <input className='search' ref={weatherRef} placeholder='Enter a city' />
        </form>
          {!loading && 
          <div className='weather'>
              <p className='name'>{weatherData.name}</p>
              <h1>{weatherData.main.temp} °F</h1>
              <p className='des'>{weatherData.weather[0].main}</p>
              <img src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}@2x.png`} />
            </div>
        }
    </div>
  )
}

export default App