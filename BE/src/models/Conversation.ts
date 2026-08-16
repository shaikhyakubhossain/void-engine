import { Schema, model, Types, type HydratedDocument } from "mongoose";

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;

  provider?: string;
  model?: string;
}

export interface Conversation {
  userId:  Types.ObjectId;

  title: string;

  messages: ConversationMessage[];

  createdAt: Date;
  updatedAt: Date;
}

export type ConversationDocument = HydratedDocument<Conversation>;

const conversationSchema = new Schema<Conversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    messages: [
      {
        id: {
          type: String,
          required: true,
        },

        role: {
          type: String,
          enum: ["user", "assistant", "system"],
          required: true,
        },

        content: {
          type: String,
          required: true,
        },

        provider: {
          type: String,
        },

        model: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ConversationModel = model<Conversation>(
  "Conversation",
  conversationSchema,
);
