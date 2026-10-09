import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownOption {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[] | DropdownOption[];
  defaultOptionLabel?: string;
  onChange: (value: string) => void;
}

const DEFAULT_OPTION_VALUE = "__all_options__";

export default function SelectDropdown({
  label,
  value,
  options,
  defaultOptionLabel,
  onChange,
}: SelectDropdownProps) {
  const id = useId();
  const selectedValue = value || (defaultOptionLabel ? DEFAULT_OPTION_VALUE : null);

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Select
        value={selectedValue}
        onValueChange={(nextValue) => {
          onChange(nextValue === DEFAULT_OPTION_VALUE ? "" : nextValue ?? "");
        }}
      >
        <SelectTrigger className="h-10 w-full bg-background/70" id={id}>
          <SelectValue placeholder={`Choose ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {defaultOptionLabel && (
            <SelectItem value={DEFAULT_OPTION_VALUE}>{defaultOptionLabel}</SelectItem>
          )}
          {options.map((option) => {
            if (typeof option === "string") {
              return (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              );
            }
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
