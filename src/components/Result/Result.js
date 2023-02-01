import React from "react";
import "./Result.scss";

const Result = ({ result }) => {
  let title = result.title;
  const indexOfSeparator = title.indexOf(" - ");
  const artist = title.substring(0, indexOfSeparator);
  title = title.substring(indexOfSeparator + 3);

  return (
    <div className="result">
      <img className="result-cover" src={result.cover_image} alt="cover" />
      <h2>{title}</h2>
      <h3>{artist}</h3>
    </div>
  );
};

export default Result;
