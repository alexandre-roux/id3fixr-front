import React, {createContext, ReactNode, useState} from 'react';

interface FileContextType {
    originalFile: File | null;
    setOriginalFile: React.Dispatch<React.SetStateAction<File | null>>;
    originalTags: any | null;
    setOriginalTags: React.Dispatch<React.SetStateAction<any | null>>;
    newTitle: string;
    setNewTitle: React.Dispatch<React.SetStateAction<string>>;
    newArtist: string;
    setNewArtist: React.Dispatch<React.SetStateAction<string>>;
    newAlbum: string;
    setNewAlbum: React.Dispatch<React.SetStateAction<string>>;
    newGenre: string;
    setNewGenre: React.Dispatch<React.SetStateAction<string>>;
    newYear: string;
    setNewYear: React.Dispatch<React.SetStateAction<string>>;
    newTrack: string;
    setNewTrack: React.Dispatch<React.SetStateAction<string>>;
    newImage: string;
    setNewImage: React.Dispatch<React.SetStateAction<string>>;
    displayResults: boolean;
    setDisplayResults: React.Dispatch<React.SetStateAction<boolean>>;
    resetNewTags: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

interface FileProviderProps {
    children: ReactNode;
}

const FileProvider = ({children}: FileProviderProps) => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalTags, setOriginalTags] = useState<any | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newArtist, setNewArtist] = useState<string>('');
    const [newAlbum, setNewAlbum] = useState<string>('');
    const [newGenre, setNewGenre] = useState<string>('');
    const [newYear, setNewYear] = useState<string>('');
    const [newTrack, setNewTrack] = useState<string>('');
    const [newImage, setNewImage] = useState<string>('https://www.chordie.com/images/no-cover.png');
    const [displayResults, setDisplayResults] = useState<boolean>(true);

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

    const contextValue: FileContextType = {
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

// Custom hook to use the FileContext
export const useFileContext = (): FileContextType => {
    const context = React.useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};

export {FileContext, FileProvider};
