import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = ({ pageNumber }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data for pageNumber:", pageNumber);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${pageNumber}`);
        console.log("Response:", response.data);
        setData(response.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(
            `Server responded with error: ${error.response.status} ${error.response.statusText}`
          );
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          setError(`No response received from server: ${error.message}`);
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          setError("Error setting up request");
          console.error("Request setup error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div>
      <h1>{data[0].pName}</h1>
      <p>Difficulty is: {data[0].pDifficulty}</p>
      <p>Description: {data[0].pDescription}</p>
      <p>Approach: {data[0].pApproach}</p>
      <p>Solution (Python):</p>
      {data[0].pSolutionPython.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <p>Solution (Java):</p>
      {data[0].pSolutionJava.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default Page;
