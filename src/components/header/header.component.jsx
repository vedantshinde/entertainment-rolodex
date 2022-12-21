import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Dropdown from "../dropdown/dropdown.component";
import { Component } from "react";

class Header extends Component {
  constructor() {
    super();
  }

  static get propTypes() {
    return {
      titleTypeDropdown: PropTypes.object,
      genreDropdown: PropTypes.object,
      getSelectedDropDownOptions: PropTypes.func,
      handleDropDownOptionsChange: PropTypes.func,
    };
  }

  render() {
    const {
      titleTypeDropdown,
      genreDropdown,
      getSelectedDropDownOptions,
      handleDropDownOptionsChange,
    } = this.props;

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Entertainment Around the Corner!
              </Typography>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ alignSelf: "center" }}
              >
                Select Details
              </Typography>
              <Dropdown
                field={titleTypeDropdown.field}
                list={titleTypeDropdown.list}
                getSelectedDropDownOptions={getSelectedDropDownOptions}
                handleDropDownOptionsChange={handleDropDownOptionsChange}
              />
              <Dropdown
                field={genreDropdown.field}
                list={genreDropdown.list}
                getSelectedDropDownOptions={getSelectedDropDownOptions}
                handleDropDownOptionsChange={handleDropDownOptionsChange}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default Header;
