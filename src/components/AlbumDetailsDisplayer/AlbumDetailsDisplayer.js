import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {FileContext} from "../../context/FileContext";
import "./AlbumDetailsDisplayer.scss";

const AlbumDetailsDisplayer = ({albumToDisplay, setDisplayAlbumDetails}) => {
    // Consume the context to get access to the global state setters.
    const {
        setDisplayResults,
        setNewTitle,
        setNewArtist,
        setNewAlbum,
        setNewGenre,
        setNewYear,
        setNewTrack,
        setNewImage,
    } = useContext(FileContext);

    // Local state for this component's data and loading status.
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(""); // Local artist string for display (from API response)

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                let response;
                if (albumToDisplay.id === albumToDisplay.master_id) {
                    response = await axios.get(
                        "https://mp3-tags-corrector.onrender.com/master",
                        {params: {id: albumToDisplay.id}}
                    );
                } else {
                    response = await axios.get(
                        "https://mp3-tags-corrector.onrender.com/release",
                        {params: {id: albumToDisplay.id}}
                    );
                }

                setData(response.data.release);
                const artistString = response.data.release.artists
                    .map((artist) => artist.name)
                    .join(", ");
                setArtist(artistString); // Set local artist string for display
            } catch (error) {
                console.error("Error while fetching details for album with ID " + albumToDisplay.id + ":", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [albumToDisplay]);

    const handleBackToResults = () => {
        setDisplayAlbumDetails(false);
        setDisplayResults(true); // Update context to show the results list
    };

    const handleTrackSelected = (track, trackNumber) => {
        setNewTitle(track.title);
        setNewArtist(artist);
        setNewAlbum(data.title);
        setNewGenre(data.styles[0] || "");
        setNewYear(data.year);
        setNewTrack(trackNumber);
        setNewImage(data.images[0]?.uri || "");
    };

    const handleGenreSelected = (genre) => {
        setNewGenre(genre);
    };

    const handleCoverSelected = (coverUri) => {
        setNewImage(coverUri);
    };

    return (
        <div className="album-details">
            <div className="back-to-results" onClick={handleBackToResults}>
                <ion-icon name="arrow-back-outline"/>
                Back to results
            </div>
            {isLoading ? (
                <p>Loading album details...</p>
            ) : data ? (
                <>
                    <div>
                        <p>
                            Release page:{" "}
                            <a href={data.uri} target="_blank" rel="noreferrer">
                                {data.uri}
                            </a>
                        </p>
                    </div>
                    <div>
                        <p>Artist: {artist}</p>
                        <p>Album: {data.title}</p>
                        <p>
                            Genre:{" "}
                            {data.styles?.map((genre, index) => (
                                <span
                                    key={index}
                                    className="genre-tag"
                                    onClick={() => handleGenreSelected(genre)}
                                >
                                    {genre}
                                    {index < data.styles.length - 1 ? ", " : ""}
                                </span>
                            )) || "N/A"}
                        </p>
                        <p>Year: {data.year}</p>
                    </div>
                    <div>
                        <p>Tracklist (select a track):</p>
                        <ul>
                            {data.tracklist?.map((track, index) => {
                                const trackNumber = `${index + 1}/${data.tracklist.length}`;
                                return (
                                    <li
                                        key={index}
                                        onClick={() => handleTrackSelected(track, trackNumber)}
                                    >
                                        {track.position} {track.title}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="album-covers">
                        {data.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image.uri}
                                alt="Album cover"
                                onClick={() => handleCoverSelected(image.uri)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p>Could not load album details.</p>
            )}
        </div>
    );
};

export default AlbumDetailsDisplayer;