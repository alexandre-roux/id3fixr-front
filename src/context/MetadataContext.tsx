import React, {createContext, useContext, useReducer} from 'react';

const MetadataContext = createContext();

const initialState = {
    selectedFile: null,
    tags: null,
    displayResults: true,
    metadata: {
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: '',
        track: '',
        image: 'https://www.chordie.com/images/no-cover.png'
    }
};

const metadataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILE':
            return {...state, selectedFile: action.payload};
        case 'SET_TAGS':
            return {...state, tags: action.payload};
        case 'SET_DISPLAY_RESULTS':
            return {...state, displayResults: action.payload};
        case 'UPDATE_METADATA':
            return {
                ...state,
                metadata: {...state.metadata, ...action.payload}
            };
        case 'RESET_METADATA':
            return initialState;
        default:
            return state;
    }
};

export const MetadataProvider = ({children}) => {
    const [state, dispatch] = useReducer(metadataReducer, initialState);

    const setFile = (file) => {
        dispatch({type: 'SET_FILE', payload: file});
    };

    const setTags = (tags) => {
        dispatch({type: 'SET_TAGS', payload: tags});
    };

    const setDisplayResults = (display) => {
        dispatch({type: 'SET_DISPLAY_RESULTS', payload: display});
    };

    const updateMetadata = (metadata) => {
        dispatch({type: 'UPDATE_METADATA', payload: metadata});
    };

    const resetMetadata = () => {
        dispatch({type: 'RESET_METADATA'});
    };

    const value = {
        state,
        setFile,
        setTags,
        setDisplayResults,
        updateMetadata,
        resetMetadata
    };

    return (
        <MetadataContext.Provider value={value}>
            {children}
        </MetadataContext.Provider>
    );
};

export const useMetadata = () => {
    const context = useContext(MetadataContext);
    if (!context) {
        throw new Error('useMetadata must be used within MetadataProvider');
    }
    return context;
};