import React, {useEffect, useState} from "react";
import axios from "axios";
import {useFileContext} from "../../context/FileContext.tsx";
import "./AlbumDetailsDisplayer.scss";
import {IonIcon} from '@ionic/react';
import {arrowBackOutline} from 'ionicons/icons';

interface AlbumDetailsDisplayerProps {
    albumToDisplay: {
        id: number;
        master_id: number;
    };
    setDisplayAlbumDetails: (display: boolean) => void;
}

interface AlbumData {
    title: string;
    uri: string;
    year: string;
    styles: string[];
    tracklist: { title: string; position: string }[];
    images: { uri: string }[];
}

const AlbumDetailsDisplayer: React.FC<AlbumDetailsDisplayerProps> = ({albumToDisplay, setDisplayAlbumDetails}) => {
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
    } = useFileContext();

    // Local state for this component's data and loading status.
    const [data, setData] = useState<AlbumData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [artist, setArtist] = useState(""); // Local artist string for display (from API response)

    useEffect(() => {
        if (isLoading) return
        setIsLoading(true);

        const fetchData = async () => {
            try {
                let response;
                if (albumToDisplay.id === albumToDisplay.master_id) {
                    response = await axios.get(
                        import.meta.env.VITE_API_URL + "/master",
                        {params: {id: albumToDisplay.id}}
                    );
                } else {
                    response = await axios.get(
                        import.meta.env.VITE_API_URL + "/release",
                        {params: {id: albumToDisplay.id}}
                    );
                }

                setData(response.data.release);
                const artistString = response.data.release.artists
                    .map((artist: { name: string }) => artist.name)
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

    const handleTrackSelected = (track: { title: string; position: string }, trackNumber: string) => {
        setNewTitle(track.title);
        setNewArtist(artist);
        setNewAlbum(data?.title ?? "");
        setNewGenre(data?.styles?.[0] ?? "");
        setNewYear(data?.year ?? "");
        setNewTrack(trackNumber);
        setNewImage(data?.images?.[0]?.uri ?? "");
    };

    const handleGenreSelected = (genre: string) => {
        setNewGenre(genre);
    };

    const handleCoverSelected = (coverUri: string) => {
        setNewImage(coverUri);
    };

    return (
        <div className="album-details">
            <div className="back-to-results" onClick={handleBackToResults}>
                <IonIcon icon={arrowBackOutline}/>
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
                            {data.styles?.map((genre: string, index: number) => (
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
                            {data.tracklist?.map((track: { title: string; position: string }, index: number) => {
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
                        {data.images?.map((image: { uri: string }, index: number) => (
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