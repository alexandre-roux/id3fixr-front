import React from "react";
import "./Result.scss";

const Result = (props) => {
  let title = props.result.title;
  const indexOfSeparator = title.indexOf(" - ");
  const artist = title.substring(0, indexOfSeparator);
  title = title.substring(indexOfSeparator + 3);
  if (props.result.type === "master") {
    title += " (Master release)";
  }

  function handleSelect(e) {
    props.setAlbumToDisplay(props.result);
    props.setDisplayResults(false);
    props.setDisplayAlbumDetails(true);
  }

  return (
    <div className="result" onClick={handleSelect}>
      <img
        className="result-cover"
        src={props.result.cover_image}
        alt="cover"
      />
      <p className="title">{title}</p>
      <p>{artist}</p>
    </div>
  );
};

export default Result;
