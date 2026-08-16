import { ReactNode } from "react";
export type SelectIconPosition = "left" | "right";

export interface SelectOption {
  id: string;

  label: string;

  description?: string;

  badge?: string;

  disabled?: boolean;
}

export interface SelectProps {
  value: string;

  options: SelectOption[];

  placeholder?: string;

  disabled?: boolean;

  className?: string;

  icon?: ReactNode;
  
  iconPosition?: SelectIconPosition;

  onChange: (id: string) => void;
}

export interface SelectOptionProps {
  option: SelectOption;

  selected: boolean;

  onSelect: (id: string) => void;
}

export interface SelectTriggerProps {
  label: string;

  placeholder: string;

  disabled: boolean;

  isOpen: boolean;

  icon?: ReactNode;
  
  iconPosition?: "left" | "right";

  onClick: () => void;
}

export interface SelectDropdownProps {
  value: string;

  options: SelectOption[];

  placement: "top" | "bottom";

  onSelect: (id: string) => void;
}