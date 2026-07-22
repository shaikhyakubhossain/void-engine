import type { ReactNode } from "react";

export interface MenuItem {
  id: string;

  label?: string;

  icon?: React.ReactNode;

  danger?: boolean;

  disabled?: boolean;

  separator?: boolean;
}

export interface MenuProps {
  items: MenuItem[];

  children: ReactNode;

  onSelect(id: string): void;

  className?: string;
}