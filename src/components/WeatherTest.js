import React, { Component } from 'react'

const weatherData = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${'London'}&appid=ae76d0efed32d9f29c4d54a5738b80ca`
).then(function(response){
    return response.json();
})
console.log(weatherData);

export class WeatherTest extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default WeatherTest
