import { Component } from "react";
import './search-box.styles.css';

class SearchBox extends Component {

    render() {

        const {onSearchChange, placeholder, className} = this.props;

        return (
          <div>
            <input
              className={`search-box ${className}`}
              type='search'
              placeholder={placeholder}
              onChange={onSearchChange}
            />
          </div>
        );
      }
}

export default SearchBox;
