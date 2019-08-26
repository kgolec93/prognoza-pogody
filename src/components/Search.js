import React, { Component } from 'react'
import Location from '../icons/location.svg'


////////////////////////////////////////////////////
////////////// SEARCH INPUT COMPONENT //////////////
////////////////////////////////////////////////////

export class Search extends Component {
    
    constructor() {
        super();
        this.state = {
            city: '',
            weatherData: '',
            initialValue: true,
            isInputEmpty: false,
            searchedValue: ''
        }
    }

    ////// GET WEATHER BY GEOLOCATION /////////
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } 
        else { 
            alert("Twoja przeglądarka nie posiada funkcji geolokalizacji");
        }
    }

    showPosition = (position) => {
        this.props.getWeatherData(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        this.setState({isInputEmpty: false, initialValue: true});
    }


    /////// Event Handlers //////

    onKeyUp = (e) => {
        //change state searched value on change
        this.setState({searchedValue: e.target.value});
    }

    //trigger search function on pressing 'enter'
    handleKeyPress = (e) => {
        //check if enter was pressed
        if (e.keyCode === 13) {
            //trigger search function
            this.handleClick();
        }
    }

    //search submit function
    handleClick = () => {
        // check if the input field is not empty
        if (this.refs.searchInput.value.trim() !== '') {

            //get the data from the input
            const searchValue = this.state.searchedValue;
            //export input value to the main function and run it
            this.props.getWeatherData(`q=${searchValue}`);
            //move imported data to the state
            this.setState({isInputEmpty: false, initialValue: true});
            //clear input value
            this.refs.searchInput.value = '';
            
        }

        //// show warning if empty input field
        else {
            // add paragraph with the warning
            this.setState({isInputEmpty: true});
        }
    }

    render() {
        return (
            <div id="search-city" className={`${this.props.initial ? '': 'searched'}`} onKeyUp={(e) => this.handleKeyPress(e)}>
                <input 
                    type="text" 
                    placeholder="Wpisz swoje miasto" 
                    ref="searchInput"
                    onKeyUp={this.onKeyUp}
                />
                <button 
                    onClick={() => this.handleClick()}>
                    Wyszukaj miasto
                </button><br />
                {/* <img src={Location} alt="" id="location" onClick={this.getLocation}/> */}
                <p className={`${this.state.isInputEmpty ? 'visible': ''}`}>Musisz wpisać miasto!</p>
            </div>
        )
    }
}

export default Search