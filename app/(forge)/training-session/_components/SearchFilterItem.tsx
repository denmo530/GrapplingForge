"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SearchFilterItemProps {
  filter: string;
  filterHandler: (filter: string, toggled: boolean) => void;
}

const SearchFilterItem: React.FC<SearchFilterItemProps> = ({
  filter,
  filterHandler,
}) => {
  const [toggled, setIsToggled] = useState<boolean>(false);

  const handleToggleChange = () => {
    const newToggled = !toggled;
    setIsToggled(newToggled);
    filterHandler(filter, newToggled);
  };

  return (
    <Toggle
      variant={"outline"}
      className={`bg-gray-200 text-muted-foreground text-xs px-4 py-0 rounded-md h-8 hover:text-primary hover:bg-gray-200 data-[state=on]:bg-malibu-200 data-[state=on]:text-primary`}
      pressed={toggled}
      onPressedChange={handleToggleChange}
    >
      {toggled && <Check size={17} />}
      {filter}
    </Toggle>
  );
};

export default SearchFilterItem;
