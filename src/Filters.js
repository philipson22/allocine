import React from "react";

class Filters extends React.Component {
  render() {
    if (this.props.active === true) {
      console.log("this.props", this.props);
      return (
        <p style={{ textDecoration: "underline", color: "red" }}>
          {this.props.label}
        </p>
      );
    } else {
      return <p>{this.props.label}</p>;
    }
  }
}

export default Filters;
