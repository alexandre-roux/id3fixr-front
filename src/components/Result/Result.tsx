import { useDispatch } from "react-redux";
import { setDisplayResults } from "../../store/fileSlice";
import "./Result.scss";
import React from "react";

interface ResultProps {
    result: {
        title: string;
        type: string;
        cover_image: string;
    };
    setAlbumToDisplay: (album: any) => void;
    setDisplayAlbumDetails: (display: boolean) => void;
}

const Result: React.FC<ResultProps> = ({result, setAlbumToDisplay, setDisplayAlbumDetails}) => {
    const dispatch = useDispatch();

    let title = result.title;
    const indexOfSeparator = title.indexOf(" - ");
    const artist = title.substring(0, indexOfSeparator);
    title = title.substring(indexOfSeparator + 3);
    if (result.type === "master") {
        title += " (Master release)";
    }

    const handleSelect = () => {
        setAlbumToDisplay(result);
        dispatch(setDisplayResults(false));
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