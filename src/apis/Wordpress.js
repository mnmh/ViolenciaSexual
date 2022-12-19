import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiWPRequest = (url, id) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url + '/' + id)
        .then((response) => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    };
    fetchData();
  }, [url]);
  return { error, isLoaded, data };
};

export default useApiWPRequest;
