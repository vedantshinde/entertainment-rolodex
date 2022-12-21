import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import "./App.css";
import Endpoints from "./utils/endpoints";
import { Box } from "@mui/system";
import Header from "./components/header/header.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      titles: [],
      titleDropdownList: [],
      genreDropdownList: [],
      selectedTitleType: "",
      selectedGenre: "",
    };

    this.handleDropDownOptionsChange =
      this.handleDropDownOptionsChange.bind(this);
    this.setSelectedDropDownOptions =
      this.setSelectedDropDownOptions.bind(this);
    this.getSelectedDropDownOptions =
      this.getSelectedDropDownOptions.bind(this);
  }

  componentDidMount() {
    this.getTitles("");
    this.getDropdownOptions(
      Endpoints.REACT_APP_TITLE_OPTIONS_URL,
      "titleDropdownList"
    );
    this.getDropdownOptions(
      Endpoints.REACT_APP_GENRE_OPTIONS_URL,
      "genreDropdownList"
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedTitleType, selectedGenre } = this.state;
    if (
      selectedTitleType == prevState.selectedTitleType &&
      selectedGenre == prevState.selectedGenre
    ) {
      return;
    }
    let queryParams = "";

    if (selectedTitleType !== null && selectedTitleType.length > 0) {
      queryParams += "titleType=" + selectedTitleType;
    }

    if (selectedGenre !== null && selectedGenre.length > 0) {
      if (queryParams.length > 0) {
        queryParams += "&";
      }
      queryParams += "genre=" + selectedGenre;
    }

    if (queryParams.length > 0) {
      this.getTitles(queryParams);
    }
  }

  getTitles = (queryParams) => {
    const { REACT_APP_TITLE_URL } = Endpoints;

    let url = REACT_APP_TITLE_URL;

    if (queryParams !== null || queryParams.length() > 0) {
      url += "?" + queryParams;
    }

    fetch(url, this.getHeaders())
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) =>
        this.setState(() => {
          return { titles: response["results"] };
        })
      )
      .catch((err) => console.error(err));
  };

  getDropdownOptions = (url, listName) => {
    fetch(url, this.getHeaders())
      .then((response) => response.json())
      .then((response) => response["results"])
      .then((response) =>
        this.setState(() => {
          return { [listName]: response };
        })
      )
      .catch((err) => console.error(err));
  };

  getHeaders = () => {
    const {
      REACT_APP_MOVIE_API_KEY_HEADER_KEY,
      REACT_APP_MOVIE_API_KEY_HEADER_VALUE,
      REACT_APP_MOVIE_HOST_HEADER_KEY,
      REACT_APP_MOVIE_HOST_HEADER_VALUE,
    } = process.env;

    const options = {
      method: "GET",
      headers: {
        [REACT_APP_MOVIE_API_KEY_HEADER_KEY]:
          REACT_APP_MOVIE_API_KEY_HEADER_VALUE,
        [REACT_APP_MOVIE_HOST_HEADER_KEY]: REACT_APP_MOVIE_HOST_HEADER_VALUE,
      },
    };

    return options;
  };

  setSelectedDropDownOptions = (field, updatedValue) => {
    switch (field) {
      case "titleType":
        this.setState({ selectedTitleType: updatedValue });
        break;
      case "genre":
        this.setState({ selectedGenre: updatedValue });
        break;
    }
  };

  getSelectedDropDownOptions = (field) => {
    switch (field) {
      case "titleType":
        return this.state.selectedTitleType;
      case "genre":
        return this.state.selectedGenre;
      default:
        return "";
    }
  };

  handleDropDownOptionsChange(field, e) {
    this.setSelectedDropDownOptions(field, e.target.value);
  }

  renderList(titles) {
    const isTitlesEmpty = titles == null || titles.length == 0;
    if (isTitlesEmpty) {
      return (
        <Box component="fieldset">
          <legend>Error</legend>
          Sorry, we do not have the requested data at the moment!
        </Box>
      );
    } else {
      return <CardList titles={titles} />;
    }
  }

  render() {
    const { titles } = this.state;

    const titleTypeDropdown = Object.create({
      field: "titleType",
      list: this.state.titleDropdownList,
    });

    const genreDropdown = Object.create({
      field: "genre",
      list: this.state.genreDropdownList,
    });
    return (
      <div className="App">
        <Header
          titleTypeDropdown={titleTypeDropdown}
          genreDropdown={genreDropdown}
          getSelectedDropDownOptions={this.getSelectedDropDownOptions}
          handleDropDownOptionsChange={this.handleDropDownOptionsChange}
        />
        {this.renderList(titles)}
      </div>
    );
  }
}

export default App;
