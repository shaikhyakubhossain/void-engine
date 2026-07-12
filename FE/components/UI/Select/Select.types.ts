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