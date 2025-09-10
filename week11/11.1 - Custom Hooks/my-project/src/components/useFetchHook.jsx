import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      return; // stop further execution if there's an error
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading };
}

export default useFetch;
