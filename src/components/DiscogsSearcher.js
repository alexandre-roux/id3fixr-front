import React, {useEffect, useState} from 'react';
import axios from "axios";

const DiscogsSearcher = ({selectedFile, tags}) => {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/search", {
          params: {
            artist: tags.artist,
            title: tags.title
          }
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, [tags])


  return (
    <>
      {data && (
        <div>

        </div>
      )}
    </>
  );
};

export default DiscogsSearcher;