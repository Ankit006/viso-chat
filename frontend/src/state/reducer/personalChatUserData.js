import { initialState } from "../initialState";
import { SAVE_PERSONALCHAT_USER_DATA, RESET } from "../stateConstant";

function personalChatUserData(state = initialState, action) {
  switch (action.type) {
    case SAVE_PERSONALCHAT_USER_DATA:
      return {
        ...state,
        personalChatUser: {
          ...state.personalChatUser,
          userId: action.payload.userId,
          username: action.payload.username,
          userProfileImg: action.payload.imgUrl,
        },
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default personalChatUserData;
