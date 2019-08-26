import React, { Component } from 'react';

/////////////////////// ICONS ///////////////////////
import Icon_Sun from '../icons/sun.svg';
import Icon_Cloud from '../icons/cloud.svg';
import Icon_Rain from '../icons/rain.svg';
import Icon_Storm from '../icons/storm.svg';
import Icon_Drizzle from '../icons/drizzle.svg';
import Icon_Snow from '../icons/snow.svg';
import Icon_Mist from '../icons/mist.svg';

/////////////////// BACKGROUNDS /////////////////////
import Bg_Sun from '../img/sun.jpg';
import Bg_Clouds from '../img/clouds.jpg';
import Bg_Rain from '../img/rain.jpg';
import Bg_Storm from '../img/storm.jpg';
import Bg_Drizzle from '../img/drizzle.jpg';
import Bg_Snow from '../img/snow.jpg';
import Bg_Mist from '../img/mist.jpg';

////////////////////////////////////////////////////
///////// JUMBOTRON WITH CURRENT WEATHER ///////////
////////////////////////////////////////////////////

export class CurrentWeather extends Component {

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

    render() {
        return (
        <div id="current-weather-container" style={{backgroundImage: `url('${this.weatherType(this.props.weather).background}')`, backgroundSize: `cover`, backgroundPosition: `50%`}}>
                <div id="jumbotron-content">
                    <h1>{this.props.city}</h1>
                    <hr />
                    <div className="result-weather-container">
                        <img src={this.weatherType(this.props.weather).icon} alt=""/>
                        <div>
                            <p className="result-temp">{this.props.convert(this.props.weather.main.temp)} °C</p><br />
                            <p>{this.weatherType(this.props.weather).weather}</p>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default CurrentWeather
