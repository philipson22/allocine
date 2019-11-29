import React from "react";

class Title extends React.Component {
  render() {
    return (
      <div className="affiche">
        <li>
          <h2>{this.props.label}</h2>
        </li>
        <li className="sous-titre">
          <h4>{this.props.date}</h4>
          <h4>Note: {this.props.note}</h4>
        </li>
        <img
          alt="Poster"
          src={
            "https://image.tmdb.org/t/p/w370_and_h556_bestv2" + this.props.photo
          }
        ></img>
        <li style={{ width: "380px", color: "white", marginTop: "10px" }}>
          {this.props.description}
        </li>
      </div>
    );
  }
}
export default Title;
