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

  onClick: () => void;
}

export interface SelectDropdownProps {
  value: string;

  options: SelectOption[];

  placement: "top" | "bottom";

  onSelect: (id: string) => void;
}