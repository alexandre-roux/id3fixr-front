// Interface for the structure of ID3 tags returned by musicmetadata
import React from "react";

interface MusicMetadataResult {
    title: string;
    artist: string[];
    album: string;
    genre: string[];
    year: string;
    track: { no: number; of: number };
    picture: { format: string; data: number[] }[];
}

// Declaration for custom elements (ion-icon)
declare namespace JSX {
    interface IntrinsicElements {
        'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            name: string;
        };
    }
}


// Declaration of the musicmetadata function on the global 'window' object
declare global {
    interface Window {
        musicmetadata(
            file: File,
            callback: (error: Error | null, result: MusicMetadataResult) => void
        ): void;
    }
}

export {};