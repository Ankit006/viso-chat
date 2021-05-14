import { initialState } from "../initialState";
import {
  POST_LOADING_TRUE,
  POST_LOADING_FALSE,
  SAVE_POST,
  POST_ERROR_TRUE,
  POST_ERROR_FALSE,
  NUMBER_OF_POSTS,
  SHOW_POST,
  RESET,
} from "../stateConstant";

function savePost(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING_TRUE:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
        },
      };
    case POST_LOADING_FALSE:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
        },
      };
    case SAVE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          data: [...state.posts.data, ...action.payload],
        },
      };
    case POST_ERROR_TRUE:
      return {
        ...state,
        posts: {
          ...state.posts,
          error: true,
        },
      };
    case POST_ERROR_FALSE:
      return {
        ...state,
        posts: {
          ...state.posts,
          error: false,
        },
      };
    case NUMBER_OF_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          numberOfPosts: action.payload,
        },
      };
    case SHOW_POST:
      return {
        ...state,
        showPost: action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default savePost;
