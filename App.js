import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        data: {
          page: 0,
          results: [{ title: "", known_for: [{ title: "" }] }],
        },
      },
      searchEngine: "",
      value: "",
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=2f90b754d4bbeebedfeca94e36fbb1b0&language=en-US&page=1&include_adult=false&query=${this.state.searchEngine}`
    );
    this.setState({ response: response });
  }

  async handleInputChange(e) {
    const value = e.currentTarget.value;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=2f90b754d4bbeebedfeca94e36fbb1b0&query=${value}`
    );
    console.log(response);

    this.setState({ response: response });
  }

  async handleReleaseDate(e) {
    const releaseDateValue = e.currentTarget.value;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=2f90b754d4bbeebedfeca94e36fbb1b0&language=en-US&limit=5&query=${releaseDateValue}&page=1&include_adult=false`
    );
    this.setState({ response: response });
  }
  render() {
    const res = this.state.response.data;

    return (
      <div>
        <div className="container">
          <div className="d-flex justify-content-center text-center">
            <h1 className="d-flex justify-content-center text-center">
              Movies Data Base
            </h1>
          </div>

          <div className="md-form mt-0">
            <input
              className="form-control"
              type="text"
              name="searchM"
              placeholder="Search"
              aria-label="Search"
              // onKeyUp={() => this.searchexe("title")}
              onKeyUp={(e) => this.handleInputChange(e)}
            />
            Search Movie Here
          </div>
          <div className="md-form mt-0">
            <input
              className="form-control"
              type="text"
              name="searchReleaseDate"
              placeholder="Search"
              // ref={(input) => (this.search = input)}
              aria-label="Search"
              onKeyUp={(e) => this.handleReleaseDate(e)}
            />
            Search From Release Date
          </div>
          {res.page == 0 ? (
            <div>
              <span class="badge badge-danger">
                Search Movies for their Rattings
              </span>
              <span class="badge badge-success">
                Search Tv Show for their rattings{" "}
              </span>
            </div>
          ) : (
            <h1> Your search for </h1>
          )}

          {res.results.map((i) =>
            i.media_type !== "movie" && i.media_type !== undefined ? (
              <div>
                <span class="badge badge-success">Tv Show Name </span> {i.name}
                <span class="badge badge-success">and Rattings </span>
                {i.vote_average}
              </div>
            ) : (
              <div>
                <span class="badge badge-danger">Movie Name </span> {i.title}
                <span class="badge badge-danger">and Rattings </span>
                {i.vote_average}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
