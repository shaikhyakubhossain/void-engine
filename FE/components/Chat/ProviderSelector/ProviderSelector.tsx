"use client";

import Select from "@/components/UI/Select/Select";
import { useChat } from "@/hooks/useChat";

const ProviderSelector = () => {
  const { chat, setSelectedProvider } = useChat();

  return (
    <Select
      value={chat.llm.selectedProvider ?? ""}
      options={chat.llm.providers.map((provider) => ({
        id: provider.id,
        label: provider.name,
      }))}
      onChange={setSelectedProvider}
    />
  );
};

export default ProviderSelector;
