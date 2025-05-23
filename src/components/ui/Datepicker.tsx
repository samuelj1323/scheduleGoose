"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatepickerProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: Date;
}

export function Datepicker({ name, onChange, value }: DatepickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (date: Date) => {
    onChange({
      target: { name, value: date.toISOString() },
    } as React.ChangeEvent<HTMLInputElement>);
    setOpen(false); // Close the popover after date selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date: Date | undefined) => {
            if (date) {
              handleDateChange(date);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
