"use client";

import type { ReactNode } from "react";

import { ToastProvider } from "@/context/ToastContext";
import { ToastContainer } from "@/components/UI/Toast";
import { ChatProvider } from "@/context/ChatContext/ChatContext";
import { AuthProvider } from "@/context/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ChatProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
