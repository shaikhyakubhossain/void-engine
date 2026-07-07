import { ChatActionTypes } from "./actions/chat.actions";
import type { ChatAction, ChatState } from "./actions/chat.types";

export const chatReducer = (
  state: ChatState,
  action: ChatAction,
): ChatState => {
  switch (action.type) {
    case ChatActionTypes.SET_INPUT:
      return {
        ...state,
        input: action.payload,
      };

    case ChatActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ChatActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case ChatActionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case ChatActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ChatActionTypes.CLEAR_CHAT:
      return {
        ...state,
        messages: [],
      };

    case ChatActionTypes.UPDATE_MESSAGE_CONTENT:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id
            ? {
                ...message,
                content: message.content + action.payload.chunk,
              }
            : message,
        ),
      };

    default:
      return state;
  }
};
