import mongoose from "mongoose";

const messageModel = mongoose.Schema({
  mainUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: [
    {
      type: String,
      required: true,
    },
  ],
});

const MessageModel = mongoose.model("messages", messageModel);

export default MessageModel;
