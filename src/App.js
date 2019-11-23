import React, { Component } from "react";
import axios from "axios";
import Title from "./Title";
import Filters from "./Filters";
import "./App.css";

class App extends Component {
  state = {
    movies: [],
    selectedTab: "popular",
    page: 1
  };
  renderPreviousPage() {
    if (this.state.page > 1) {
      return (
        <button
          style={{
            height: "40px",
            width: "140px"
          }}
          onClick={() =>
            this.setState({ page: this.state.page - 1 }, () => {
              axios
                .get(
                  "https://api-allocine.herokuapp.com/api/movies/" +
                    this.state.selectedTab +
                    "?p=" +
                    this.state.page
                )
                .then(response => {
                  this.setState({ movies: response.data.results });
                });
            })
          }
        >
          Page précédente
        </button>
      );
    } else {
      return null;
    }
  }
  renderNextPage() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        axios
          .get(
            "https://api-allocine.herokuapp.com/api/movies/" +
              this.state.selectedTab +
              "?p=" +
              this.state.page
          )
          .then(response => {
            this.setState({ movies: response.data.results });
          });
      }
    );
  }

  render() {
    console.log("toto", this.state.movies);
    const moviesComponents = [];
    for (let i = 0; i < this.state.movies.length; i++) {
      moviesComponents.push(
        <Title
          key={i}
          label={i + 1 + ". " + this.state.movies[i].title}
          photo={this.state.movies[i].poster_path}
          date={this.state.movies[i].release_date}
          description={this.state.movies[i].overview}
        ></Title>
      );
    }
    return (
      <div>
        <header>
          <img src="/logo-allocine.png" alt="logo"></img>
        </header>

        <ul className="disposition">
          <li
            onClick={() => {
              this.setState({ selectedTab: "popular" });
              axios
                .get("https://api-allocine.herokuapp.com/api/movies/popular")
                .then(response => {
                  this.setState({ movies: response.data.results });
                });
            }}
          >
            <Filters
              label="Les incontournables"
              active={this.state.selectedTab === "popular"}
            ></Filters>
          </li>
          <li
            onClick={() => {
              this.setState({ selectedTab: "upcoming" });
              axios
                .get("https://api-allocine.herokuapp.com/api/movies/upcoming")
                .then(response => {
                  this.setState({ movies: response.data.results });
                });
            }}
          >
            <Filters
              label="Bientôt à l'affiche"
              active={this.state.selectedTab === "upcoming"}
            ></Filters>
          </li>
          <li
            // className={
            //   this.state.selectedTab === "top-rated" ? "underlined" : "normal"
            // }
            onClick={() => {
              this.setState({ selectedTab: "top_rated" });
              axios
                .get("https://api-allocine.herokuapp.com/api/movies/top_rated")
                .then(response => {
                  this.setState({ movies: response.data.results });
                });
            }}
          >
            <Filters
              label="Les mieux notés"
              active={this.state.selectedTab === "top_rated"}
            ></Filters>
          </li>
        </ul>
        <div className="films">
          <ul className="resultats"> {moviesComponents}</ul>
        </div>

        <div className="container">
          {this.renderPreviousPage()}
          <button
            style={{
              height: "40px",
              width: "140px",
              margin: "10px"
            }}
            onClick={() => this.renderNextPage()}
          >
            Page suivante
          </button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get("https://api-allocine.herokuapp.com/api/movies/popular")
      .then(response => {
        this.setState({ movies: response.data.results });
      });
  }
}

export default App;
