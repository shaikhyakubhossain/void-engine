"use client";
import Select from "@/components/UI/Select/Select";
import { useChat } from "@/hooks/useChat";
import { Brain } from 'lucide-react';
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMemo } from "react";



const ProviderSelector = () => {
  const { chat, setSelectedProvider } = useChat();
  const isMobile = useIsMobile(768);
  const selectedProvider = useMemo(() => {
    
    return isMobile ? "" : chat.llm.selectedProvider ?? "";
  }, [chat.llm.selectedProvider, isMobile]);
  
  return (
    <Select
      value={selectedProvider}
      options={chat.llm.providers.map((provider) => ({
        id: provider.id,
        label: provider.name,
      }))}
      icon={<Brain size={18} />}
      iconPosition="left"
      onChange={setSelectedProvider}
      placeholder={isMobile ? "" : "Select a provider"}
    />
  );
};

export default ProviderSelector;
