import React, { useEffect, useState } from "react";
import "./AlbumDetailsDisplayer.scss";
import axios from "axios";

const AlbumDetailsDisplayer = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState();

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
        if (response.data.release.artists.length === 1) {
          setArtist(response.data.release.artists[0].name);
        } else {
          setArtist(
            response.data.release.artists.map((artist) => artist.name + ", ")
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [props.albumToDisplay]);

  const handleBackToResults = () => {
    props.setDisplayAlbumDetails(false);
    props.setDisplayResults(true);
  };

  const handleTrackSelected = (track, trackNumber) => {
    console.log("handleTrackSelected trackNumber=" + trackNumber);
    props.setTitle(track.title);
    props.setArtist(artist);
    props.setAlbum(data.title);
    props.setGenre(data.styles[0]);
    props.setYear(data.year);
    props.setTrack(trackNumber);
    props.setImage(data.images[0].uri);
  };

  return (
    <div className="album-details">
      <div className="back-to-results" onClick={handleBackToResults}>
        <ion-icon name="arrow-back-outline" />
        Back to results
      </div>
      {!isLoading && (
        <>
          <div>
            <p>Artist: {artist}</p>
            <p>Album: {data.title}</p>
            <p>Genre: {data.styles[0]}</p>
            <p>Year: {data.year}</p>
          </div>
          <div>
            <p>Tracklist (select a track):</p>
            <ul>
              {data.tracklist.map((track, index) => {
                const trackNumber = index + 1 + "/" + data.tracklist.length;
                const trackDetails =
                  trackNumber + " " + track.position + " " + track.title;
                return (
                  <li key={index} onClick={() => handleTrackSelected(track, trackNumber)}>
                    {trackDetails}
                  </li>
                );
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
