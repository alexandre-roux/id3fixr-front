import React, {createContext, useState} from 'react';

const FileContext = createContext();

const FileProvider = ({children}) => {
    const [originalFile, setOriginalFile] = useState(null);
    const [originalTags, setOriginalTags] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newArtist, setNewArtist] = useState('');
    const [newAlbum, setNewAlbum] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newTrack, setNewTrack] = useState('');
    const [newImage, setNewImage] = useState('https://www.chordie.com/images/no-cover.png');
    const [displayResults, setDisplayResults] = useState(true);

    const resetNewTags = () => {
        setNewTitle('');
        setNewArtist('');
        setNewAlbum('');
        setNewGenre('');
        setNewYear('');
        setNewTrack('');
        setNewImage('https://www.chordie.com/images/no-cover.png');
        setOriginalTags(null);
    };

    const contextValue = {
        originalFile,
        setOriginalFile,
        originalTags,
        setOriginalTags,
        newTitle,
        setNewTitle,
        newArtist,
        setNewArtist,
        newAlbum,
        setNewAlbum,
        newGenre,
        setNewGenre,
        newYear,
        setNewYear,
        newTrack,
        setNewTrack,
        newImage,
        setNewImage,
        displayResults,
        setDisplayResults,
        resetNewTags
    };

    return (
        <FileContext.Provider value={contextValue}>
            {children}
        </FileContext.Provider>
    );
};

export {FileContext, FileProvider};