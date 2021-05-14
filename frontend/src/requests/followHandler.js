import axios from "axios";
import { NEW_FOLLOWING, REMOVE_FOLLOWING } from "../state/stateConstant";
import socket from "../modules/handleSocket";
/**
 *
 * @param {string} accountId
 * @param {string} otherUserId
 * @param {string} accessToken
 * @param {Function} errorBarControl
 * @param {Function} setError
 * @param {Function} setFollowThisPerson
 * @param {Function} dispatch
 * @description handle follow data and error
 */

export const follow = async (
  accountId,
  otherUserId,
  accessToken,
  errorBarControl,
  setError,
  setFollowThisPerson,
  dispatch
) => {
  setFollowThisPerson(true);
  dispatch({ type: NEW_FOLLOWING });
  const res = await axios.post(
    "/api/follow",
    { follower: accountId, following: otherUserId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.data.status === "error") {
    errorBarControl(setError, "server error");
    setFollowThisPerson(false);
    dispatch({ type: REMOVE_FOLLOWING });
    return;
  }

  socket.emit("follow", { follower: accountId, following: otherUserId });
};

export const unfollow = async (
  accountId,
  otherUserId,
  accessToken,
  errorBarControl,
  setError,
  setFollowThisPerson,
  dispatch
) => {
  setFollowThisPerson(false);
  dispatch({ type: REMOVE_FOLLOWING });
  const res = await axios.post(
    "/api/unfollow",
    {
      follower: accountId,
      following: otherUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (res.data.status === "error") {
    errorBarControl(setError, "server error");
    setFollowThisPerson(true);
    dispatch({ type: NEW_FOLLOWING });
  }
};
