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

        setData(response.data.release);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [props.albumToDisplay]);

  function handleBackToResults() {
    props.setDisplayAlbumDetails(false);
    props.setDisplayResults(true);
  }

  return (
    <div className="album-details">
      <div className="back-to-results" onClick={handleBackToResults}>
        <ion-icon name="arrow-back-outline" />
        Back to results
      </div>
      {!isLoading && (
        <>
          <div>
            <p>
              Artist:{" "}
              {data.artists.length === 1
                ? data.artists[0].name
                : data.artists.map((artist) => artist.name + ", ")}
            </p>
            <p>Album: {data.title}</p>
            <p>Genre: {data.styles[0]}</p>
            <p>Year: {data.year}</p>
          </div>
          <div>
            <p>Tracklist (choose a track):</p>
            <ul>
              {data.tracklist.map((track, index) => {
                let trackDetails = "";
                trackDetails += index + 1;
                trackDetails += "/";
                trackDetails += data.tracklist.length;
                trackDetails += " ";
                trackDetails += track.title;
                return <li>{trackDetails}</li>;
              })}
            </ul>
          </div>
          <img src={data.images[0].uri} alt="Album cover" />
        </>
      )}
    </div>
  );
};

export default AlbumDetailsDisplayer;
