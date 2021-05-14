import { GET_ACCESS_TOKEN, SAVE_USERDATA, LOGIN } from "../state/stateConstant";
import socket from "../modules/handleSocket";
import axios from "axios";

async function startUpData(dispatch) {
  const accessToken = await axios.get("/api/getAccessToken");
  if (accessToken.data.status === "success") {
    dispatch({
      type: GET_ACCESS_TOKEN,
      payload: accessToken.data.accessToken,
    });

    const userInfo = await axios.get("/api/userInfo", {
      headers: {
        Authorization: `Bearer ${accessToken.data.accessToken}`,
      },
    });
    if (userInfo.data.status === "success") {
      dispatch({
        type: SAVE_USERDATA,
        payload: {
          userId: userInfo.data.userId,
          username: userInfo.data.username,
          email: userInfo.data.email,
          profileImage: userInfo.data.profileImage,
          follower: userInfo.data.follower,
          following: userInfo.data.following,
        },
      });
      dispatch({ type: LOGIN });
      socket.auth = { accountId: userInfo.data.userId };
      socket.connect();
    } else {
      return;
    }
  } else {
    return;
  }
}

export default startUpData;
