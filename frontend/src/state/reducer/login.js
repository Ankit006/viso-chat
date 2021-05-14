import { LOGIN, LOGOUT, RESET } from "../stateConstant";
import { initialState } from "../initialState";

function loginState(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: true,
      };
    case LOGOUT:
      return {
        ...state,
        login: false,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default loginState;
