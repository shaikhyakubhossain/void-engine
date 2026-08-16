import { ConversationModel } from "../models/Conversation.js";

interface CreateConversationData {
  userId: string;
  title: string;
  messages: {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    provider?: string;
    model?: string;
  }[];
}

export async function createConversation(
  data: CreateConversationData,
) {
  return ConversationModel.create({
    userId: data.userId,
    title: data.title,
    messages: data.messages,
  });
}

export async function getUserConversations(userId: string) {
  return ConversationModel.find({
    userId,
  }).sort({
    updatedAt: -1,
  });
}

export async function getConversation(
  userId: string,
  conversationId: string,
) {
  return ConversationModel.findOne({
    _id: conversationId,
    userId,
  });
}

export async function updateConversationTitle(
  userId: string,
  conversationId: string,
  title: string,
) {
  return ConversationModel.findOneAndUpdate(
    {
      _id: conversationId,
      userId,
    },
    {
      $set: {
        title: title.trim(),
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
}

export async function deleteConversation(
  userId: string,
  conversationId: string,
) {
  return ConversationModel.findOneAndDelete({
    _id: conversationId,
    userId,
  });
}