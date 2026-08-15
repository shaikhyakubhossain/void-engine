"use client";

import { useMemo } from "react";

import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/useToast";

import Select from "@/components/UI/Select/Select";

const ModelSelector = () => {
  const { chat, setSelectedModel } = useChat();
  const { toast } = useToast();

  const providerGroup = useMemo(() => {
    return chat.llm.providerModels.find(
      (group) =>
        group.provider.id === chat.llm.selectedProvider,
    );
  }, [
    chat.llm.providerModels,
    chat.llm.selectedProvider,
  ]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);

    toast.info(
      "Some models may be unavailable because VoidEngine is currently using a free-tier API key.",
      {
        title: "MODEL NOTICE",
        duration: 10000,
      },
    );
  };

  return (
    <Select
      value={chat.llm.selectedModel ?? ""}
      options={
        providerGroup?.models.map((model) => ({
          id: model.id,
          label: model.name,
        })) ?? []
      }
      onChange={handleModelChange}
      placeholder="Select a model"
    />
  );
};

export default ModelSelector;