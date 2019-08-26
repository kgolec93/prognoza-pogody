import React, { Component } from 'react';
import Arrow from '../icons/drop-down.svg';
import North from '../icons/arr-north.svg';
import uuid from 'uuid';

export class ResultItem extends Component {

    state = {
        extended: false
    }

    //list dropdown
    listDropdown = () => {
        this.setState({extended: !this.state.extended})
    }


    render() {
        return (
            <li key={uuid.v4()} className="result-item" style={{backgroundImage: `url('${this.props.weatherType.background}')`, backgroundSize: `cover`, backgroundPosition: `50%`}}>
                <div className="bg-cover" style={{width: '100%', height: '100%', padding: '20px'}}>
                    <div  style={this.state.extended ? {display: 'none'} : {display: 'initial'}}>
                        <div className="result-time-container">
                            <p className="result-date">{this.props.date}</p>
                            <p className="result-date">{this.props.day}</p> 
                            <p className="result-time">{this.props.time}</p><br /> 
                        </div>
                        <hr/>
                        <div className="result-weather-container">
                            <img src={this.props.weatherType.icon} alt=""/>
                            <div>
                                <p className="result-temp">{this.props.temp} °C</p><br />
                                <p>{this.props.weatherType.weather}</p>
                            </div>
                        </div>
                    </div>

                    <ul className="weather-extended" style={this.state.extended ? {display: 'initial'} : {display: 'none'}}>
                        <li>Temperatura: {this.props.temp} °C</li>
                        <li>{this.props.weatherType.weather}</li>
                        <li>Ciśnienie: {this.props.pressure}</li>
                        <li>Zachmurzenie: {this.props.cloudiness}</li>
                        <li>Wiatr: {this.props.windSpeed}</li>
                        <li>Kierunek wiatru:</li>
                        <img className="wind-arrow" src={North} alt="" style={{transform: `rotate(${this.props.windDirection})`}}/>
                    </ul>
                    <br/>
                    <img className="dropdown-arrow" src={Arrow} alt="" onClick={this.listDropdown} style={this.state.extended ? {transform: 'rotate(180deg)'} : {}}/>
                </div> 

            </li>
        )
    }
}

export default ResultItem
