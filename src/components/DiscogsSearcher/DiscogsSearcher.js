import React, {useEffect, useState} from "react";
import axios from "axios";
import Result from "../Result/Result";
import "./DiscogsSearcher.scss";
import AlbumDetailsDisplayer from "../AlbumDetailsDisplayer/AlbumDetailsDisplayer";
import {useMetadata} from "../../context/MetadataContext";

const DiscogsSearcher = () => {
    const {state, updateMetadata, setDisplayResults} = useMetadata();
    const {tags, selectedFile, displayResults} = state;
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [displayAlbumDetails, setDisplayAlbumDetails] = useState(false);
    const [albumToDisplay, setAlbumToDisplay] = useState();

    useEffect(() => {
        if (!tags || !selectedFile) return;
        setIsLoading(true);

        let keywords = tags.artist + " " + tags.title;

        if (keywords.trim() === "") {
            keywords = selectedFile.name;
            keywords = keywords.replaceAll(" - ", " ");
            keywords = keywords.replace(".mp3", "");
            keywords = keywords.replace("feat.", "");
            keywords = keywords.replace(/\[.*?\]/g, "");
            keywords = keywords.replace(/\(.*?\)/g, "");
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://mp3-tags-corrector.onrender.com/search",
                    // "http://localhost:3100/search",
                    {
                        params: {
                            keywords: keywords,
                        },
                    }
                );
                if (isLoading) {
                    console.log("Discogs API response:");
                    console.log(response);
                    setData(response.data.results);
                    setDisplayAlbumDetails(false);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isLoading) {
                    console.error("Error fetching data from Discogs API:", error);
                    setData([]);
                    setIsLoading(false);
                }
            }
        };
        console.log("Searching Discogs DB with keywords: " + keywords);
        fetchData();
    }, [selectedFile]);

    return (
        isLoading ? (
            <p>Loading results...</p>
        ) : (
            <div className="discogs-results">
                <div className={displayResults ? "results" : "results hidden"}>
                    {data.length === 0 ? (
                        <p>No results found.</p>
                    ) : (
                        data.map((result, index) => (
                            <Result
                                key={index}
                                result={result}
                                setDisplayResults={setDisplayResults}
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
                            setDisplayResults={setDisplayResults}
                            setDisplayAlbumDetails={setDisplayAlbumDetails}
                            updateMetadata={updateMetadata}
                        />
                    </div>
                )}
            </div>
        )
    );
};
export default DiscogsSearcher;
