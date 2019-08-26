import React, { Component } from 'react';
import ResultItem from './ResultItem';
import CurrentWeather from './CurrentWeather';

/////////////////////// ICONS ///////////////////////
import Icon_Sun from '../icons/sun.svg';
import Icon_Cloud from '../icons/cloud.svg';
import Icon_Rain from '../icons/rain.svg';
import Icon_Storm from '../icons/storm.svg';
import Icon_Drizzle from '../icons/drizzle.svg';
import Icon_Snow from '../icons/snow.svg';
import Icon_Mist from '../icons/mist.svg';
import Back from '../icons/arr-back.svg';
import Next from '../icons/arr-next.svg';

/////////////////// BACKGROUNDS /////////////////////
import Bg_Sun from '../img/sun.jpg';
import Bg_Clouds from '../img/clouds.jpg';
import Bg_Rain from '../img/rain.jpg';
import Bg_Storm from '../img/storm.jpg';
import Bg_Drizzle from '../img/drizzle.jpg';
import Bg_Snow from '../img/snow.jpg';
import Bg_Mist from '../img/mist.jpg';

////////////////////////////////////////////////////
////////// SEARCH RESULTS MAIN COMPONENT ///////////
////////////////////////////////////////////////////

export class SearchResults extends Component {

    // convert temprature to celcius
    tempConvert = (temp) => {
        return (Math.ceil(temp - 273.15))
    }

    //convert pressure
    pressConvert = (press) => {
        return (`${Math.ceil(press)} hPa`)
    }

    //convert cloudiness
    cloudConvert = (cloud) => {
        return (`${Math.ceil(cloud * 100)}%`)
    }

    //convert wind speed 
    windConvert = (wind) => {
        return (`${Math.round(wind * 3,6)} km/h`)
    }

    //get wind direction
    windDirection = (wind) => {
        return (`${wind+180}deg`)
    }

    //get weather type
    weatherType = (prop) => {
        const x = prop.weather[0].id;
        if (x === 800) {
            return ({icon: Icon_Sun, weather: 'Słonecznie', background: Bg_Sun})
        }
        else if (x === 801 || x === 802 || x === 803 || x === 804) {
            return ({icon: Icon_Cloud, weather: 'Pochmurnie', background: Bg_Clouds})
        }
        else if (x === 500 || x === 501 || x === 502 || x === 503 || x === 504 || x === 511 || x === 520 || x === 521 || x === 522 || x === 531) {
            return ({icon: Icon_Rain, weather: 'Deszczowo', background: Bg_Rain})
        }
        else if (x === 200 || x === 201 || x === 202 || x === 210 || x === 211 || x === 212 || x === 221 || x === 230 || x === 231 || x === 232) {
            return ({icon: Icon_Storm, weather: 'Burzowo', background: Bg_Storm})
        }
        else if (x === 300 || x === 301 || x === 302 || x === 310 || x === 311 || x === 312 || x === 313 || x === 314 || x === 321) {
            return ({icon: Icon_Drizzle, weather: 'Mżawka', background: Bg_Drizzle})
        }
        else if (x === 600 || x === 601 || x === 602 || x === 611 || x === 612 || x === 615 || x === 616 || x === 620 || x === 621 || x === 622) {
            return ({icon: Icon_Snow, weather: 'Śnieg', background: Bg_Snow})
        } 
        else if (x === 701 || x === 711 || x === 721 ||  x === 741) {
            return ({icon: Icon_Mist, weather: 'Mgła', background: Bg_Mist})
        }
    }

    //get full date (polish months)
    getFullDate = item => {
        let day = new Date(item * 1000).getDate();
        let year = new Date(item * 1000).getFullYear();
        let month
        
        switch (new Date(item * 1000).getMonth()) {
            default:
                day = "";
                break;
            case 0:
                month = "Stycznia";
                break;
            case 1:
                month = "Lutego";
                break;
            case 2:
                month = "Marca";
                break;
            case 3:
                month = "Kwietnia";
                break;
            case 4:
                month = "Maja";
                break;
            case 5:
                month = "Czerwca";
                break;
            case 6:
                month = "Lipca";
                break;
            case 7:
                month = "Sierpnia";
                break;
            case 8:
                month = "Września";
                break;
            case 9:
                month = "Października";
                break;
            case 10:
                month = "Listopada";
                break;
            case 11:
                month = "Grudnia";
                break;
        }
        return (`${day} ${month} ${year}`.toUpperCase())
    }

    //get time
    getTime = item => {
        let hours = new Date(item * 1000).getHours();
        return (`${hours}:00`)
    }

    //get current day name
    getCurrentDay = item => {
        let day
        switch (new Date(item * 1000).getDay()) {
            default:
                day = "";
                break;
            case 0:
                day = "Niedziela";
                break;
            case 1:
                day = "Poniedziałek";
                break;
            case 2:
                day = "Wtorek";
                break;
            case 3:
                day = "Środa";
                break;
            case 4:
                day = "Czwartek";
                break;
            case 5:
                day = "Piątek";
                break;
            case 6:
                day = "Sobota";
        }
        return (day.toUpperCase())
    }

    scrollRight = () => {
        const movement = this.refs.resultList.scrollWidth / 15;
        this.refs.resultList.scrollLeft += movement;
    }

    scrollLeft = () => {
        const movement = this.refs.resultList.scrollWidth / 15;
        this.refs.resultList.scrollLeft -= movement;
    }

    render() {
        return (
            <div id="search-results" className={this.props.initial ? '' : 'visible'} >
                
                <CurrentWeather 
                    convert={this.tempConvert}
                    city={this.props.city}
                    weather={this.props.currentWeather}
                />

                <div id="result-container">
                    <img src={Back} className="nav-arrow left" alt="" onClick={this.scrollLeft}/>
                    <ul id="result-list" ref="resultList">
                        {this.props.weatherData.map((item) => {
                            return (
                                <ResultItem
                                    date={this.getFullDate(item.dt)}
                                    day={this.getCurrentDay(item.dt)}
                                    time={this.getTime(item.dt)}
                                    weatherType={this.weatherType(item)}
                                    temp={this.tempConvert(item.main.temp)}
                                    pressure={this.pressConvert(item.main.pressure)}
                                    cloudiness={this.cloudConvert(item.clouds.all)}
                                    windSpeed={this.windConvert(item.wind.speed)}
                                    windDirection={this.windDirection(item.wind.deg)}
                                />
                            )
                        })} 
                    </ul>
                    <img src={Next} className="nav-arrow right" alt="" onClick={this.scrollRight}/>
                </div>
                  
            </div>
        )
    }
}

export default SearchResults