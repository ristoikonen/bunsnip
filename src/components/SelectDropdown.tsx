import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { highlightKeywords } from "@/lib/highlightKeywords";

interface DropdownOption {
  value: string;
  label: string;
  keywords?: string[];
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
  const selectedOption = options.find(
    (option) => typeof option !== "string" && option.value === value,
  );
  const selectedLabel =
    typeof selectedOption === "object" && selectedOption !== null
      ? highlightKeywords(selectedOption.label, selectedOption.keywords ?? [])
      : selectedValue === DEFAULT_OPTION_VALUE
        ? defaultOptionLabel
        : typeof options.find((option) => option === value) === "string"
          ? value
          : undefined;

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
          <SelectValue
            className="min-w-0 truncate"
            placeholder={`Choose ${label.toLowerCase()}`}
          >
            {selectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[min(28rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]">
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
                {highlightKeywords(option.label, option.keywords ?? [])}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
