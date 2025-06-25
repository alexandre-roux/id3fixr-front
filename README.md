# MP3 Tags Corrector

## Overview

**MP3 Tags Corrector** is a work-in-progress application designed to help users update and correct ID3 tags for MP3
files. It leverages the **Discogs API** to fetch accurate metadata based on existing tags or file names when tags are
missing.

## Live Demo

Try out the application here: [ID3 Tag Corrector Live Demo](https://id3fxr.netlify.app/)

## How it works

1. Select a MP3 file for processing
2. The Discogs database is queried and a list of results is displayed
3. Select the result corresponding to the track
4. Tags are automatically updated with the right values which can also be changed manually
5. Save the copy of the file with the corrected tags

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
git clone git@github.com:alexandre-roux/mp3-tags-corrector-front.git
cd mp3-tags-corrector-front
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

