import { cn } from "@/lib/utils";
import { ChevronsUpDown, Command, Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { FormControl } from "../ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

interface SelectableListProps {
  form: any;
  field: any;
  selectables: any;
  placeholder: string;
}

export const SelectableList: React.FC<SelectableListProps> = ({
  form,
  field,
  selectables,
  placeholder,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? selectables.find(
                  (selectable: any) => selectable.value === field.value
                )?.label
              : "Select item"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {selectables.map((selectable: any) => (
              <CommandItem
                value={selectable.label}
                key={selectable.value}
                onSelect={() => {
                  form.setValue("martialArtsTechniques", selectable.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectable.value === field.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {selectable.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
