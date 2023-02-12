import React, { useEffect, useState } from "react";
import "./AlbumDetailsDisplayer.scss";
import axios from "axios";

const AlbumDetailsDisplayer = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let response;
        if (props.albumToDisplay.id === props.albumToDisplay.master_id) {
          response = await axios.get("http://localhost:3100/master", {
            params: {
              id: props.albumToDisplay.id,
            },
          });
        } else {
          response = await axios.get("http://localhost:3100/release", {
            params: {
              id: props.albumToDisplay.id,
            },
          });
        }

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [props.albumToDisplay]);

  function handleBackToResults(e) {
    props.setDisplayAlbumDetails(false);
    props.setDisplayResults(true);
  }

  return (
    <div className="album-details">
      <div className="back-to-results" onClick={handleBackToResults}>
        <ion-icon name="arrow-back-outline" />
        Back to results
      </div>

      <p>{props.albumToDisplay.id}</p>
    </div>
  );
};

export default AlbumDetailsDisplayer;
