"use client";

import { useMemo } from "react";

import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/useToast";

import Select from "@/components/UI/Select/Select";
import { TOAST_MESSAGES, TOAST_TITLES } from "@/constants/toast.constants";
import { BrainCircuit } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ModelSelector = () => {
  const { chat, setSelectedModel } = useChat();
  const { toast } = useToast();
  const isMobile = useIsMobile(768);

  const selectedModel = useMemo(() => {
    return isMobile ? "" : (chat.llm.selectedModel ?? "");
  }, [chat.llm.selectedModel, isMobile]);

  const providerGroup = useMemo(() => {
    return chat.llm.providerModels.find(
      (group) => group.provider.id === chat.llm.selectedProvider,
    );
  }, [chat.llm.providerModels, chat.llm.selectedProvider]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);

    toast.info(TOAST_MESSAGES.MODEL_NOTICE, {
      title: TOAST_TITLES.MODEL_NOTICE,
      position: "top-center",
    });
  };

  return (
    <Select
      value={selectedModel}
      options={
        providerGroup?.models.map((model) => ({
          id: model.id,
          label: model.name,
        })) ?? []
      }
      icon={<BrainCircuit size={18} />}
      iconPosition="left"
      onChange={handleModelChange}
      placeholder={isMobile ? "" : "Select a model"}
    />
  );
};

export default ModelSelector;
