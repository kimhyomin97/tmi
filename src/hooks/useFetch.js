import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, refresh) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, ...refresh]);

  return { data, loading, error };
};
export default useFetch;
