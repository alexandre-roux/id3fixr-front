import React, { useEffect, useState } from "react";
import axios from "axios";
import Result from "../Result/Result";
import "./DiscogsSearcher.scss";

const DiscogsSearcher = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    let keywords = "";

    if (props.tags.title) {
      if (props.tags.artist) {
        keywords += props.tags.artist;
        keywords += " ";
      }
      keywords += props.tags.title;
    } else {
      keywords = props.selectedFile.name;
      keywords = keywords.replace(" - ", " ");
      keywords = keywords.replace(".mp3", "");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/search", {
          params: {
            keywords: keywords,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [props.tags]);

  return (
    !isLoading && (
      <div className="discogs-results">
        <div className="results">
          {data.results.map((result, index) => {
            return (
              <Result
                key={index}
                result={result}
                setDisplayResults={props.setDisplayResults}
                setDisplayAlbumDetails={props.setDisplayAlbumDetails}
                setAlbumToDisplay={props.setAlbumToDisplay}
              />
            );
          })}
        </div>
      </div>
    )
  );
};
export default DiscogsSearcher;
