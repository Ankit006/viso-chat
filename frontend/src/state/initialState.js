export const initialState = {
  login: false,
  userId: "",
  username: "",
  email: "",
  profileImage: "",
  accessToken: "",
  follower: 0,
  following: 0,
  accountView: "",
  notifications: [],
  showPost: {},
  personalChatUser: {
    userId: "",
    username: "",
    userProfileImg: "",
  },
  posts: {
    numberOfPosts: false,
    loading: false,
    data: [],
    error: false,
  },
};
