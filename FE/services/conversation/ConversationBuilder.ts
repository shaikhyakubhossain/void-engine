import type {
    ChatMessage,
    Conversation,
} from "@/types";

interface BuildConversationOptions {
    id: string;

    title: string;

    existingCreatedAt?: number;

    previousMessages: ChatMessage[];

    userMessage: ChatMessage;

    assistantMessage: ChatMessage;

    assistantContent: string;
}

export class ConversationBuilder {
    static build(
        options: BuildConversationOptions,
    ): Conversation {
        const now = Date.now();

        return {
            id: options.id,

            title: options.title,

            messages: [
                ...options.previousMessages,

                options.userMessage,

                {
                    ...options.assistantMessage,
                    content: options.assistantContent,
                },
            ],

            createdAt:
                options.existingCreatedAt ??
                now,

            updatedAt: now,
        };
    }
}