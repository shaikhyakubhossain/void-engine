"use client";

import { useMemo } from "react";

import { useChat } from "@/hooks/useChat";
import Select from "@/components/UI/Select/Select";

const ModelSelector = () => {
  const { chat, setSelectedModel } = useChat();

  const providerGroup = useMemo(() => {
    return chat.llm.providerModels.find(
      (group) => group.provider.id === chat.llm.selectedProvider,
    );
  }, [chat.llm.providerModels, chat.llm.selectedProvider]);

  return (
    <Select
      value={chat.llm.selectedModel ?? ""}
      options={
        providerGroup?.models.map((model) => ({
          id: model.id,
          label: model.name,
        })) ?? []
      }
      onChange={setSelectedModel}
      placeholder="Select a model"
    />
  );
};

export default ModelSelector;
