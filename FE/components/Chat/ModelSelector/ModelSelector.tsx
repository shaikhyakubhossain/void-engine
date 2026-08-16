"use client";

import { useMemo } from "react";

import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/useToast";

import Select from "@/components/UI/Select/Select";
import { TOAST_MESSAGES, TOAST_TITLES } from "@/constants/toast.constants";

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

    toast.info(TOAST_MESSAGES.MODEL_NOTICE, {
      title: TOAST_TITLES.MODEL_NOTICE,
      position: "top-center",
    });
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