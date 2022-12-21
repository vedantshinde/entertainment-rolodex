import { Component } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      titleDropdownList: [],
    };
  }

  static get propTypes() {
    return {
      field: PropTypes.string,
      list: PropTypes.array,
      getSelectedDropDownOptions: PropTypes.func,
      handleDropDownOptionsChange: PropTypes.func,
    };
  }

  camelToFlat(camel) {
    const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

    let flat = "";

    camelCase.forEach((word) => {
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return flat;
  }

  render() {
    const {
      field,
      list,
      getSelectedDropDownOptions,
      handleDropDownOptionsChange,
    } = this.props;
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>{this.camelToFlat(field)}</InputLabel>
          <Select
            value={getSelectedDropDownOptions(field)}
            label={field}
            onChange={(e) => handleDropDownOptionsChange(field, e)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list.map((t, key) => {
              if (t != null) {
                return (
                  <MenuItem value={t} key={key}>
                    <em>{this.camelToFlat(t)}</em>
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default Dropdown;
