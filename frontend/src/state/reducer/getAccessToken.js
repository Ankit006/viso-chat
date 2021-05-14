import { initialState } from "../initialState";
import { GET_ACCESS_TOKEN, RESET } from "../stateConstant";

function getAccessToken(state = initialState, action) {
  switch (action.type) {
    case GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default getAccessToken;
