import React, {createContext, ReactNode, useContext, useState} from 'react';

interface FileObjectContextType {
    originalFile: File | null;
    setOriginalFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileObjectContext = createContext<FileObjectContextType | undefined>(undefined);

export const FileObjectProvider = ({children}: { children: ReactNode }) => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    return (
        <FileObjectContext.Provider value={{originalFile, setOriginalFile}}>
            {children}
        </FileObjectContext.Provider>
    );
};

export const useFileObject = () => {
    const context = useContext(FileObjectContext);
    if (!context) {
        throw new Error('useFileObject must be used within a FileObjectProvider');
    }
    return context;
}; 