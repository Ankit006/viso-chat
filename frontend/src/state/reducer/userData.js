import { initialState } from "../initialState";
import {
  SAVE_USERDATA,
  NEW_FOLLOWER,
  NEW_FOLLOWING,
  REMOVE_FOLLOWER,
  REMOVE_FOLLOWING,
  CHANGE_USERNAME,
  RESET,
} from "../stateConstant";

function userData(state = initialState, action) {
  switch (action.type) {
    case SAVE_USERDATA:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        email: action.payload.email,
        profileImage: action.payload.profileImage,
        follower: action.payload.follower,
        following: action.payload.following,
      };
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case NEW_FOLLOWER:
      return {
        ...state,
        follower: state.follower + 1,
      };
    case REMOVE_FOLLOWER:
      return {
        ...state,
        follower: state.follower - 1,
      };
    case NEW_FOLLOWING:
      return {
        ...state,
        following: state.following + 1,
      };
    case REMOVE_FOLLOWING:
      return {
        ...state,
        following: state.following - 1,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default userData;
