// src/components/SelectDropdown.tsx
import { type ChangeEvent } from "react";

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

export default function SelectDropdown({
  label,
  value,
  options,
  defaultOptionLabel,
  onChange,
}: SelectDropdownProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
      >
        {defaultOptionLabel && <option value="">{defaultOptionLabel}</option>}
        
        {options.map((opt) => {
          // Handle simple string array format
          if (typeof opt === "string") {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          }
          // Handle structured object format
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
