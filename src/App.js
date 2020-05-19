import React, { Component } from "react";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Card from "./components/Card.js";

import "./App.css";

class App extends Component {
  state = {
    celsius: "",
    fahren: "",
    display: 0,
    desc: "",
    city: "",
    gif: "",
    onF: true,
    startLoad: 0,
    endLoad: 0,
  };

  callWeatherAPI = async (location) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=39a1f2980b88d25b429f8259138e3586`,
        { mode: "cors" }
      );

      // get time for end of API call
      this.setState((prevState) => ({
        ...prevState,
        endLoad: Date.now(),
      }));

      const result = await response.json();
      // console.log(result);
      this.getTemp(result.main.temp);
      this.getWeatherDesc(result.weather[0].main);
      this.callGIPHYAPI(result.weather[0].main);
    } catch (error) {
      throw new Error("Issues with reaching Open Weather API: ", error);
    }
  };

  callGIPHYAPI = async (weatherDesc) => {
    try {
      // change weather description to sunny if it's clear for better gifs
      if (weatherDesc === "Clear") {
        weatherDesc = "Sunny";
      }

      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=V5qrU600DwFzoLEo2gYFYBFiN6dFECXz&s=${
          weatherDesc + " Weather"
        }`,
        { mode: "cors" }
      );
      const result = await response.json();
      const src = await result;

      //console.log(result);

      this.setState((prevState) => ({
        ...prevState,
        gif: src.data.images.fixed_height.url,
      }));
    } catch (error) {
      throw new Error("Issues with reaching GIPHY API: ", error);
    }
  };

  getTemp = (kel) => {
    const toC = Math.round(kel - 273);
    const toF = Math.round(1.8 * (kel - 273) + 32);

    console.log("K: ", kel);
    console.log("C: ", toC);
    console.log("F: ", toF);

    this.setState((prevState) => ({
      ...prevState,
      celsius: toC,
      fahren: toF,
      display: toF,
    }));
  };

  getWeatherDesc = (desc) => {
    console.log("Desc: ", desc);

    this.setState({
      desc: desc,
    });
  };

  checkCity = (city) => {
    this.setState({
      city: city,
    });

    this.callWeatherAPI(city);
  };

  changeTemp = () => {
    if (this.state.onF === true) {
      this.setState((prevState) => ({
        ...prevState,
        display: this.state.celsius,
        onF: false,
      }));
    } else if (this.state.onF === false) {
      this.setState((prevState) => ({
        ...prevState,
        display: this.state.fahren,
        onF: true,
      }));
    }
  };

  loadTime = (time) => {
    this.setState((prevState) => ({
      ...prevState,
      startLoad: time,
    }));
  };

  render() {
    return (
      <div className="mainContainer">
        <Header />
        <Form checkCity={this.checkCity} loadTime={this.loadTime} />
        <Card stats={this.state} changeTemp={this.changeTemp} />
      </div>
    );
  }
}

export default App;
