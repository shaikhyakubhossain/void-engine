export interface ChatInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;

  onChange: (value: string) => void;
  onSubmit: () => void;
}