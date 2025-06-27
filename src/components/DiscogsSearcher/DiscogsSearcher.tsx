import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Result from "../Result/Result";
import AlbumDetailsDisplayer from "../AlbumDetailsDisplayer/AlbumDetailsDisplayer.tsx";
import {FileContext} from "../../context/FileContext.tsx";
import "./DiscogsSearcher.scss";

//TODO Check UseEffect dependencies everywhere.
const DiscogsSearcher = () => {
    // Consume the context for data needed for the search
    const {originalTags, originalFile, displayResults} = useContext(FileContext);

    // Local state for search results and UI visibility
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [displayAlbumDetails, setDisplayAlbumDetails] = useState(false);
    const [albumToDisplay, setAlbumToDisplay] = useState(null);

    useEffect(() => {
        if (isLoading) return;
        setIsLoading(true);

        // Ensure a file is present before searching
        if (!originalFile) return;

        let keywords = originalTags.artist.join(' ') + " " + originalTags.title; // .join(' ') in case of multiple artists

        if (keywords.trim() === "") {
            keywords = originalFile.name;
            keywords = keywords.replaceAll(" - ", " ");
            keywords = keywords.replace(".mp3", "");
            keywords = keywords.replace("feat.", "");
            keywords = keywords.replace(/\[.*?\]/g, "");
            keywords = keywords.replace(/\(.*?\)/g, "");
        }
        console.log("Searching Discogs DB with keywords: " + keywords);

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_API_URL + "/search",
                    {
                        params: {keywords: keywords},
                    }
                );
                console.log("Discogs API response:", response);
                setData(response.data.results);
            } catch (error) {
                console.error("Error fetching data from Discogs API:", error);
                setData([]); // Set to empty array on error to prevent crashes
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [originalFile, originalTags.artist, originalTags.title]);

    if (isLoading) {
        return <p>Loading results...</p>;
    }

    if (!data) {
        return <p>No results found.</p>;
    }

    return (
        <div className="discogs-results">
            <div className={displayResults ? "results" : "results hidden"}>
                {data.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    data.map((result, index) => (
                        <Result
                            key={index}
                            result={result}
                            setDisplayAlbumDetails={setDisplayAlbumDetails}
                            setAlbumToDisplay={setAlbumToDisplay}
                        />
                    ))
                )}
            </div>
            {albumToDisplay && (
                <div className={displayAlbumDetails ? "" : "hidden"}>
                    <AlbumDetailsDisplayer
                        albumToDisplay={albumToDisplay}
                        setDisplayAlbumDetails={setDisplayAlbumDetails}
                    />
                </div>
            )}
        </div>
    );
};

export default DiscogsSearcher;