import { useEffect, useRef, useState } from "react";
import axios from "axios";

function useFetchComments(postId, start, end) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const numberOfComments = useRef(false);
  const [comments, setComments] = useState([]);

  const loadingComments = async (postId, start, end) => {
    if (
      numberOfComments.current !== false &&
      start >= numberOfComments.current
    ) {
      return;
    }

    setLoading(true);
    setError(false);
    const res = await axios.post("/api/getComments", {
      postId,
      start,
      end,
    });

    if (res.data.status === "success") {
      setComments((prevState) => [...prevState, ...res.data.comments]);
      numberOfComments.current = res.data.numberOfComments;
      setLoading(false);
    } else if (res.data.status === "error") {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    loadingComments(postId, start, end);
    return () => {
      source.cancel();
    };
  }, [start, end]);

  return { loading, comments, error, setComments };
}

export default useFetchComments;
