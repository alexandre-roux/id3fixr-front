# MP3 Tags Corrector

## Overview

**MP3 Tags Corrector** is a work-in-progress application designed to help users update and correct ID3 tags for MP3
files. It leverages the **Discogs API** to fetch accurate metadata based on existing tags or file names when tags are
missing.

## Live Demo

Try out the application here: [ID3 Tag Corrector Live Demo](https://mp3-tags-corrector.netlify.app/)

## Features

- Select an MP3 file for processing
- Automatically search for metadata using the **Discogs API**
- Display a list of search results
- Allow users to select the correct track
- Update ID3 tags with accurate information
- Option to save a corrected version of the file

## Technology Stack

This project is developed using:

- **React** for the frontend
- **Discogs API** for metadata retrieval
- **Yarn** for package management

## Installation & Usage

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd id3-tag-corrector
yarn install
```

### Running the Application

To start the application, run:

```bash
yarn start
```

This will launch the application in your default web browser.

### Contributing

As this is a work-in-progress, contributions are welcome! Feel free to submit issues, feature requests, or pull
requests.

### License

This project is licensed under the MIT License.

### Acknowledgements

This project uses the **Discogs API** for metadata retrieval. Special thanks to the Discogs community for their
contributions to music metadata.

