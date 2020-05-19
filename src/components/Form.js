import React, { Component } from "react";

import "../App.css";

export class Form extends Component {
  state = {
    city: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.checkCity(this.state.city);
    this.props.loadTime(Date.now());
    this.setState({
      city: "",
    });
  };

  onChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  render() {
    return (
      <div className="formContainer">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Name of City..."
            value={this.state.city}
            onChange={this.onChange}
            name="city"
          />
          <button type="submit" value="Submit">
            Check Weather
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
