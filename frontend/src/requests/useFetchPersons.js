import { useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 *
 * @param {number} skip
 * @param {string} accessToken
 * @returns persons,error,loading
 */

function useFetchPersons(skip, accessToken) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const numberOfPersons = useRef(false);
  const [persons, setPersons] = useState([]);

  const loadingPerson = async (skip) => {
    if (numberOfPersons.current !== false && skip >= numberOfPersons.current) {
      return;
    }
    setLoading(true);
    setError(false);
    const res = await axios.get(`/api/getAllFollowers?skip=${skip}&limit=8`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.data.status === "success") {
      setPersons((prevState) => [...prevState, ...res.data.data]);
      numberOfPersons.current = res.data.numberOfFollowing;
      setLoading(false);
    } else if (res.data.status === "error") {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    loadingPerson(skip);
    return () => {
      source.cancel();
    };
  }, [skip]);

  return { loading, persons, error };
}

export default useFetchPersons;
