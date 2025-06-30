import React, {useEffect} from "react";
import {saveAs} from "file-saver";
import {ID3Writer} from "browser-id3-writer";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store";
import {
    setOriginalTags,
    setDisplayResults,
    setNewTitle,
    setNewArtist,
    setNewAlbum,
    setNewGenre,
    setNewYear,
    setNewTrack
} from "../../store/fileSlice";
import "./FileDetailsEditor.scss";

const FileDetailsEditor = () => {
    const dispatch = useDispatch();
    const originalFile = useSelector((state: RootState) => state.file.originalFile);
    const originalTags = useSelector((state: RootState) => state.file.originalTags);
    const newTitle = useSelector((state: RootState) => state.file.newTitle);
    const newArtist = useSelector((state: RootState) => state.file.newArtist);
    const newAlbum = useSelector((state: RootState) => state.file.newAlbum);
    const newGenre = useSelector((state: RootState) => state.file.newGenre);
    const newYear = useSelector((state: RootState) => state.file.newYear);
    const newTrack = useSelector((state: RootState) => state.file.newTrack);
    const newImage = useSelector((state: RootState) => state.file.newImage);

    useEffect(() => {
        if (!originalFile) return;
        dispatch(setDisplayResults(false));
        dispatch(setOriginalTags(null));
        window.musicmetadata(originalFile, function (error, result) {
            if (error) {
                console.error("Error reading file metadata: ", error);
            }
            dispatch(setOriginalTags(result));
            dispatch(setDisplayResults(true));
        });
    }, [originalFile, dispatch]);

    const writeFile = (coverArrayBuffer: ArrayBuffer | null) => {
        if (!originalFile) return;

        console.log("Creating file.");
        const reader = new FileReader();
        reader.onload = function () {
            const arrayBuffer = reader.result as ArrayBuffer;
            const writer = new ID3Writer(arrayBuffer);

            // Use state from context to write new ID3 tags
            if (newTitle) writer.setFrame("TIT2", newTitle);
            if (newArtist) writer.setFrame("TPE1", [newArtist]);
            if (newAlbum) writer.setFrame("TALB", newAlbum);
            if (newYear) { // @ts-ignore
                writer.setFrame("TYER", String(newYear));
            }
            if (newTrack) writer.setFrame("TRCK", newTrack);
            if (newGenre) writer.setFrame("TCON", [newGenre]);
            if (coverArrayBuffer) { // Ensure coverArrayBuffer exists
                writer.setFrame("APIC", {
                    type: 3,
                    data: coverArrayBuffer,
                    description: "Album cover",
                });
            }

            writer.addTag();
            const blob = writer.getBlob();
            console.log("File created.");
            saveAs(blob, originalFile.name);
        };
        reader.onerror = function () {
            console.error("Reader error: ", reader.error);
        };
        reader.readAsArrayBuffer(originalFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Fetching image: " + newImage);
        if (newImage && newImage.startsWith('http')) { // Only fetch if it's a URL
            try {
                const response = await axios.get(
                    import.meta.env.VITE_API_URL + "/image",
                    {
                        params: {imageurl: newImage},
                        responseType: "arraybuffer",
                    }
                );
                writeFile(new Uint8Array(response.data));
            } catch (error) {
                console.error("Error while creating ArrayBuffer for image: ", error);
                // Fallback to writing tags without a cover if the image fetch fails
                writeFile(null);
            }
        } else {
            // Write tags without a new cover if no image is provided or if it's not a URL
            writeFile(null);
        }
    };

    return (
        <>
            {originalTags && (
                <form onSubmit={handleSubmit}>
                    <div className="file-details">
                        <div className="original-details">
                            <div>
                                <p>Filename: {originalFile?.name}</p>
                            </div>
                            <div>
                                <p>Title: {originalTags.title}</p>
                                <p>Artist: {originalTags.artist.join(', ')}</p>
                                <p>Album: {originalTags.album}</p>
                                <p>Genre: {originalTags.genre.join(', ')}</p>
                                <p>Year: {originalTags.year}</p>
                                <p>
                                    Track: {originalTags.track.no}/{originalTags.track.of}
                                </p>
                            </div>
                            <div className="album-cover">
                                {originalTags.picture && originalTags.picture.length > 0 ? (
                                    <img
                                        src={`data:${originalTags.picture[0].format};base64,${btoa(
                                            new Uint8Array(originalTags.picture[0].data).reduce(
                                                (data, byte) => data + String.fromCharCode(byte),
                                                ""
                                            )
                                        )}`}
                                        alt="Album cover"
                                    />
                                ) : (
                                    <img
                                        src="https://www.chordie.com/images/no-cover.png"
                                        alt="No album cover"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="button">
                            <input
                                type="image"
                                src="https://www.seekpng.com/png/full/23-238249_arrow-clipart-windows-back-button-logo-png.png"
                                alt="Save new details"
                                name="submit"
                            />
                        </div>

                        <div className="new-details">
                            <div>
                                <p>New values:</p>
                            </div>
                            <div className="form-fields">
                                <input
                                    placeholder="Title"
                                    value={newTitle}
                                    onChange={(e) => dispatch(setNewTitle(e.target.value))}
                                />
                                <input
                                    placeholder="Artist"
                                    value={newArtist}
                                    onChange={(e) => dispatch(setNewArtist(e.target.value))}
                                />
                                <input
                                    placeholder="Album"
                                    value={newAlbum}
                                    onChange={(e) => dispatch(setNewAlbum(e.target.value))}
                                />
                                <input
                                    placeholder="Genre"
                                    value={newGenre}
                                    onChange={(e) => dispatch(setNewGenre(e.target.value))}
                                />
                                <input
                                    className="number-input"
                                    placeholder="Year"
                                    type="number" // Use type="number" for year
                                    value={newYear}
                                    onChange={(e) => dispatch(setNewYear(e.target.value))}
                                />
                                <input
                                    placeholder="Track"
                                    value={newTrack}
                                    onChange={(e) => dispatch(setNewTrack(e.target.value))}
                                />
                            </div>
                            <div className="album-cover">
                                <img
                                    src={
                                        newImage || "https://www.chordie.com/images/no-cover.png"
                                    }
                                    alt="New album cover"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default FileDetailsEditor;