import { initialState } from "../initialState";
import {
  SAVE_ALL_NOTIFICATIONS,
  SAVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS,
  RESET,
} from "../stateConstant";

function saveNotifications(state = initialState, action) {
  switch (action.type) {
    case SAVE_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
      };
    case SAVE_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case REMOVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default saveNotifications;
