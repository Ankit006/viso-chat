import { initialState } from "../initialState";
import { VIEW_ACCOUNT, RESET } from "../stateConstant";

function viewAccount(state = initialState, action) {
  switch (action.type) {
    case VIEW_ACCOUNT:
      return {
        ...state,
        accountView: action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default viewAccount;
