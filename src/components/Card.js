import React, { Component } from "react";

import "../App.css";

export class Card extends Component {
  render() {
    const { city, desc, display, onF } = this.props.stats;
    return (
      <div className="cardContainer">
        <p className="city">{city}</p>
        <img src={this.props.stats.gif} alt=""></img>
        <p className="desc">{desc}</p>
        <div>{display}</div>
        <button onClick={this.props.changeTemp}>{onF ? "F°" : "C°"}</button>
        <p className="load">
          Load Time: {this.props.stats.endLoad - this.props.stats.startLoad}ms
        </p>
      </div>
    );
  }
}

export default Card;
