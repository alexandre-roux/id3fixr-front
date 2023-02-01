import React, { useEffect, useState } from "react";
import axios from "axios";
import Result from "../Result/Result";
import "./DiscogsSearcher.scss";

const DiscogsSearcher = ({ selectedFile, tags }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    let keywords = "";

    if (tags.title) {
      if (tags.artist) {
        keywords += tags.artist;
        keywords += " ";
      }
      keywords += tags.title;
    } else {
      keywords = selectedFile.name;
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
  }, [tags]);

  return (
    !isLoading && (
      <div className="results">
        {data.results.map((result, index) => {
          console.log(result);
          return <Result key={index} result={result} />;
        })}
      </div>
    )
  );
};
export default DiscogsSearcher;
