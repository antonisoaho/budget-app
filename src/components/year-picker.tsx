import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface YearPickerProps {
  value: number;
  onChange: (year: number) => void;
}

export function YearPicker({ value, onChange }: YearPickerProps) {
  const incrementYear = () => onChange(value + 1);
  const decrementYear = () => onChange(value - 1);

  return (
    <div className="relative col-span-3">
      <Input
        type="number"
        readOnly
        value={value}
        className="w-full text-center pr-10 pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-default"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={decrementYear}
        className="absolute left-0 top-0 h-full px-2 hover:bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={incrementYear}
        className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
