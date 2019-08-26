import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import uuid from 'uuid';

class App extends Component {
  state = {
      appId: '9b5843fa583578140ce467bf3298ef6e',
      currentWeather: [],
      weatherData: [],
      searchValue: "",
      isInitial: true,
      cityName: []
  }


  getWeatherData = (searchValue) => {
    //TEST ISSUE
    // console.log("Data z app.js: ", this.state);
    
    //set the searched value to the state
    this.setState({searchValue:searchValue})

    ////////////////////////////////
    /////// CURRENT WEATHER ////////
    ////////////////////////////////

    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchValue}&appid=${this.state.appId}`)
    .then(function(resp){
      return (resp.json());
    })
    .then(res => {
      if (res.cod === 200) {
        this.setState({currentWeather: res})
      }
    })

    /////////////////////////////////
    //// 5 DAY / 3 HOUR FORECAST ////
    /////////////////////////////////

    //importing the data from API ///
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchValue}&appid=${this.state.appId}`)
    .then(function(resp){
        return resp.json();
    })
    .then(res => {
      if (res.cod === '200') {
        const cityName = res.city.name;
        const arr = [cityName];
        this.setState({weatherData: res.list, cityName: arr, isInitial:false})
      }
      else {
        alert("Nie znaleziono wybranego miasta");
      }
    })
  }

 removeInitial = () => {
   this.setState({isInitial:false})
 }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Prognoza pogody</h3>
        </header>
        <main>

          <Search 
            weatherType={this.state.weatherType}
            getWeatherData={this.getWeatherData} 
            removeInitial={this.removeInitial} 
            initial={this.state.isInitial}
            weatherGeolocation={this.getWeatherDataLoc}
          />

          {/* <button id="test-btn" onClick={() => {if (this.state.weatherData !== "") {
            console.log(this.state)
            }}}>TEST BUTTON
          </button> */}


          {this.state.cityName.map((item) => {
            return (<SearchResults 
              key={uuid.v4()}
              currentWeather={this.state.currentWeather}
              weatherData={this.state.weatherData} 
              initial={this.state.isInitial} 
              city={item}
            />)
            })}
          

        </main>
        <footer>
          <p>kgolec93&copy;2019</p>
        </footer>
      </div>
    );
  }
}

export default App;
