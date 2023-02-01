import React, { useEffect, useState } from "react";
import axios from "axios";

const DiscogsSearcher = ({ selectedFile, tags }) => {
  const [data, setData] = useState();

  useEffect(() => {
    let keywords = "";

    if (tags.artist && tags.title) {
      keywords = tags.artist + " " + tags.title;
    } else {
      keywords = selectedFile.name;
      keywords = keywords.replace(" - ", " ");
      keywords = keywords.replace(".mp3", "");
      console.log(keywords);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/search", {
          params: {
            keywords: keywords,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [tags]);

  return <>{data && <div></div>}</>;
};

export default DiscogsSearcher;
