import { Component } from "react";
import PropTypes from "prop-types";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
class CardList extends Component {
  static get propTypes() {
    return {
      titles: PropTypes.array,
    };
  }

  render() {
    const { titles } = this.props;
    return (
      <>
        <ImageList sx={{ width: "80%", height: "80%", margin: "0 auto" }}>
          {titles.map((t, key) => {
            let titleName = t.titleText.text;
            let titleImage = t.primaryImage != null ? t.primaryImage.url : null;
            if (titleName != null && titleImage != null) {
              return (
                <ImageListItem key={key}>
                  <img
                    style={{ width: "80%", height: "70%", margin: "0 auto" }}
                    src={titleImage}
                    alt={titleName}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={titleName}
                    sx={{
                      width: "80%",
                      margin: "0 auto",
                      backgroundColor: "whitesmoke",
                    }}
                    position="below"
                  />
                </ImageListItem>
              );
            }
          })}
        </ImageList>
      </>
    );
  }
}

export default CardList;
