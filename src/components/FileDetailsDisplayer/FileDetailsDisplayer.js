import React, {useEffect} from "react";
import "./FileDetailsDisplayer.scss";
import {ID3Writer} from "browser-id3-writer";
import {saveAs} from "file-saver";
import axios from "axios";
import {useMetadata} from "../../context/MetadataContext.js";

const FileDetailsDisplayer = () => {
    const {
        state,
        setTags,
        setTitle,
        setArtist,
        setAlbum,
        setGenre,
        setYear,
        setTrack,
        setDisplayResults
    } = useMetadata();

    const {
        selectedFile,
        tags,
        title,
        artist,
        album,
        genre,
        year,
        track,
        image
    } = state;

    useEffect(() => {
        if (!selectedFile) return;
        try {
            window.musicmetadata(selectedFile, function (error, result) {
                if (error) {
                    console.error("Error reading file metadata:", error);
                    return;
                }
                setTags(result);
                setDisplayResults(true);
            });
        } catch (error) {
            console.error(error);
        }
    }, [selectedFile]);

    const writeFile = (coverArrayBuffer) => {
        console.log("Creating file.")
        const reader = new FileReader();
        reader.onload = function () {
            const arrayBuffer = reader.result;
            // arrayBuffer of song or empty arrayBuffer if you just want only id3 tag without song
            const writer = new ID3Writer(arrayBuffer);
            if (title) writer.setFrame("TIT2", title);
            if (artist) writer.setFrame("TPE1", [artist]);
            if (album) writer.setFrame("TALB", album);
            if (year) writer.setFrame("TYER", year);
            if (track) writer.setFrame("TRCK", track);
            if (genre) writer.setFrame("TCON", [genre]);
            if (arrayBuffer)
                writer.setFrame("APIC", {
                    type: 3,
                    data: coverArrayBuffer,
                    description: "Album cover",
                });
            writer.addTag();
            const blob = writer.getBlob();
            console.log("File created.");
            saveAs(blob, selectedFile.name);
        };
        reader.onerror = function () {
            console.error("Reader error:", reader.error);
        };
        reader.readAsArrayBuffer(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an ArrayBuffer of the cover image
        if (image) {
            try {
                const response = await axios.get(
                    process.env.API_URL + "/image",
                    {
                        params: {imageurl: image},
                        responseType: "arraybuffer",
                    }
                );
                await writeFile(new Uint8Array(response.data));
            } catch (error) {
                console.error("Error while creating ArrayBuffer for image:", error);
            }
        } else {
            writeFile();
        }
    };

    return (
        <>
            {tags && (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="file-details">
                        <div className="original-details">
                            <div>
                                <p>Filename: {selectedFile.name}</p>
                            </div>
                            <div>
                                <p>Title: {tags.title}</p>
                                <p>Artist: {tags.artist}</p>
                                <p>Album: {tags.album}</p>
                                <p>Genre: {tags.genre}</p>
                                <p>Year: {tags.year}</p>
                                <p>
                                    Track: {tags.track.no}/{tags.track.of}
                                </p>
                            </div>
                            <div className="album-cover">
                                {tags.picture.length > 0 ? (
                                    <img
                                        src={`data:${tags.picture[0].format};base64,${btoa(
                                            new Uint8Array(tags.picture[0].data).reduce(
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
                                    className="wide"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    className="wide"
                                    placeholder="Artist"
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                />
                                <input
                                    className="wide"
                                    placeholder="Album"
                                    value={album}
                                    onChange={(e) => setAlbum(e.target.value)}
                                />
                                <input
                                    placeholder="Genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                                <input
                                    placeholder="Year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <input
                                    placeholder="Track"
                                    value={track}
                                    onChange={(e) => setTrack(e.target.value)}
                                />
                            </div>
                            <div className="album-cover">
                                <img
                                    src={
                                        image === ""
                                            ? "https://www.chordie.com/images/no-cover.png"
                                            : image
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

export default FileDetailsDisplayer;
