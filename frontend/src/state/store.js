import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducer
import userData from "./reducer/userData";
import getAccessToken from "./reducer/getAccessToken";
import savePost from "./reducer/savePost";
import loginState from "./reducer/login";
import viewAccount from "./reducer/viewAccount";
import personalChatUserData from "./reducer/personalChatUserData";
import saveNotifications from "./reducer/saveNotifications";

const rootReducer = combineReducers({
  userdata: userData,
  token: getAccessToken,
  posts: savePost,
  loginState,
  viewAccount,
  personalChatUserData,
  saveNotifications,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
