"use client";

import { createBudget } from "@/actions/budgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { YearPicker } from "@/components/common/year-picker";
import { ClipboardPlus, ReceiptPoundSterling } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BudgetPopover = () => {
  const router = useRouter();
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [budgetName, setBudgetName] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleCreateBudget = async () => {
    try {
      const response = await createBudget({
        name: budgetName.trim(),
        year: year,
      });
      if (response.status === 201) {
        setBudgetName("");
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button className="flex space-between">
          <ClipboardPlus className="mr-2" /> Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <p className="text-xl text-center">Create your budget</p>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right"
            >
              Name
            </Label>
            <Input
              id="name"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="year"
              className="text-right"
            >
              Year
            </Label>
            <YearPicker
              onChange={(year) => setYear(year)}
              value={year}
            />
          </div>
          <Separator />
        </div>
        <div className="flex flex-col justify-end gap-2 mt-3">
          <Button
            type="button"
            onClick={handleCreateBudget}
          >
            Create Budget
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BudgetPopover;
