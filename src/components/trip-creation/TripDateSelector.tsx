
import { useTripCreation } from "@/contexts/TripCreationContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import React, { useState } from "react";

const TripDateSelector = () => {
  const { state, dispatch } = useTripCreation();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleDateTypeChange = (value: "single" | "range") => {
    dispatch({ type: "SET_DATE_TYPE", payload: value });
    dispatch({ type: "SET_START_DATE", payload: null });
    dispatch({ type: "SET_DATE_RANGE", payload: undefined });
  };

  const handleSingleDateSelect = (date: Date | undefined) => {
    dispatch({ type: "SET_START_DATE", payload: date || null });
    dispatch({ type: "SET_DATE_RANGE", payload: undefined });
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    dispatch({ type: "SET_START_DATE", payload: null });
    dispatch({ type: "SET_DATE_RANGE", payload: range });
  };

  const getDateDisplayText = () => {
    if (state.dateType === "single") {
      return state.startDate
        ? format(state.startDate, "🗓️ MMM dd")
        : "🗓️ Select date";
    } else {
      if (state.dateRange?.from) {
        if (state.dateRange.to) {
          return `🗓️ ${format(state.dateRange.from, "MMM dd")} - ${format(state.dateRange.to, "MMM dd")}`;
        }
        return `🗓️ ${format(state.dateRange.from, "MMM dd")} - ?`;
      }
      return "🗓️ Select dates";
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Trip Dates
      </label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 w-full pl-12 justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-600 transition-colors",
              !state.startDate && !state.dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-500 w-5 h-5"/>
            {getDateDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 border-b">
            <RadioGroup
              value={state.dateType}
              onValueChange={(value: "single" | "range") => handleDateTypeChange(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Single day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="range" id="range" />
                <Label htmlFor="range">Date range</Label>
              </div>
            </RadioGroup>
          </div>
          {state.dateType === "single" ? (
            <Calendar
              mode="single"
              selected={state.startDate || undefined}
              onSelect={handleSingleDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
          ) : (
            <Calendar
              mode="range"
              selected={state.dateRange}
              onSelect={handleRangeSelect}
              initialFocus
              className="pointer-events-auto"
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TripDateSelector;
