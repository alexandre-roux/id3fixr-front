import React, {useContext} from "react";
import {FileContext} from "../../context/FileContext.tsx";
import "./Result.scss";

const Result = ({result, setAlbumToDisplay, setDisplayAlbumDetails}) => {
    const {setDisplayResults} = useContext(FileContext);

    let title = result.title;
    const indexOfSeparator = title.indexOf(" - ");
    const artist = title.substring(0, indexOfSeparator);
    title = title.substring(indexOfSeparator + 3);
    if (result.type === "master") {
        title += " (Master release)";
    }

    const handleSelect = () => {
        setAlbumToDisplay(result);
        setDisplayResults(false);
        setDisplayAlbumDetails(true);
    };

    return (
        <div className="result" onClick={handleSelect}>
            <img
                className="result-cover"
                src={result.cover_image}
                alt="cover"
            />
            <p className="title">{title}</p>
            <p>{artist}</p>
        </div>
    );
};

export default Result;