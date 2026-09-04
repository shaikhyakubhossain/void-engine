import { ConversationModel } from "../../models/Conversation.js";
import { ConversationTitleService } from "./conversation-title.service.js";

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

interface SaveConversationData {
  userId: string;
  conversationId?: string;
  userMessage: {
    id: string;
    content: string;
  };
  assistantMessage: {
    id: string;
    content: string;
    provider: string;
    model: string;
  };
}

export async function createConversation(data: CreateConversationData) {
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

export async function getConversation(userId: string, conversationId: string) {
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

export async function saveConversation(data: SaveConversationData) {
  if (!data.conversationId) {
    return ConversationModel.create({
      userId: data.userId,
      title: ConversationTitleService.generate(data.userMessage.content),
      messages: [
        {
          id: data.userMessage.id,
          role: "user",
          content: data.userMessage.content,
        },
        {
          id: data.assistantMessage.id,
          role: "assistant",
          content: data.assistantMessage.content,
          provider: data.assistantMessage.provider,
          model: data.assistantMessage.model,
        },
      ],
    });
  }

  const conversation = await ConversationModel.findOne({
    _id: data.conversationId,
    userId: data.userId,
  });

  if (!conversation) {
    return null;
  }

  conversation.messages.push({
    id: data.userMessage.id,
    role: "user",
    content: data.userMessage.content,
  });

  conversation.messages.push({
    id: data.assistantMessage.id,
    role: "assistant",
    content: data.assistantMessage.content,
    provider: data.assistantMessage.provider,
    model: data.assistantMessage.model,
  });

  await conversation.save();

  return conversation;
}
