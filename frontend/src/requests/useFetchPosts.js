import { useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 * @file custom hook for fetch all or a perticular user post
 * @param {number} skip - number of skip files
 * @param {string} api - api name for fetching post
 * @param {string} accessToken
 * @param {string} method - fetching method(get or post)
 * @param {object} jsonData - seding data in post method
 * @returns {object} - loading(boolean) && posts(array) && error(boolean)
 * @description this react custom hook fetch all the posts of a user or all users. It's return an object
 * while include a posts variable which is an array. Every array contain = _id,userId,
 * profileImage(user profile image url),likes(number of likes),commants(array),
 * username,imageUrl(post image),description(post description)
 */

function useFetchPosts(skip, api, accessToken, method, jsonData = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const numberOfDocs = useRef(false);
  const [posts, setPosts] = useState([]);
  const loadingPosts = async (skip) => {
    if (numberOfDocs.current !== false && skip >= numberOfDocs.current) return;
    setLoading(true);
    setError(false);

    let postsRes;

    if (method === "get") {
      postsRes = await axios.get(`${api}?skip=${skip}&limit=3`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else if (method === "post") {
      postsRes = await axios.post(`${api}?skip=${skip}&limit=3`, jsonData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    if (postsRes.data.status === "success") {
      setPosts((prevState) => [...prevState, ...postsRes.data.message]);
      numberOfDocs.current = postsRes.data.numberOfDocuments;
      setLoading(false);
    } else if (postsRes.data.status === "error") {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    loadingPosts(skip);
    return () => {
      source.cancel();
    };
  }, [skip]);
  return { loading, posts, error };
}

export default useFetchPosts;
