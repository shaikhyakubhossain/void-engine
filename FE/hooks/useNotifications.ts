"use client";

import { useEffect, useState } from "react";

import type { Notification } from "@/types";

import { NotificationManager } from "@/services/notification/NotificationManager";

export function useNotifications(): Notification[] {
  const [notifications, setNotifications] = useState<Notification[]>(
    () => NotificationManager.getAll(),
  );

  useEffect(() => {
    return NotificationManager.subscribe(setNotifications);
  }, []);

  return notifications;
}