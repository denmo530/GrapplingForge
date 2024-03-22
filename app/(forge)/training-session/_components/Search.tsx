"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import useAddSessionModal from "@/hooks/useAddSessionModal";

const Search = () => {
  const addSessionModal = useAddSessionModal();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchHandler = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full mx-auto space-y-2">
      {/* <SearchFilters setFilters={setFilters} /> */}
      <div className="flex justify-between gap-4 items-center">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 z-10" />
          <Input
            type="text"
            placeholder="Search training sessions"
            className="h-10 px-3 pl-10 pr-3 py-2"
            onChange={(e) => {
              searchHandler(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
        </div>
        <Button
          className="bg-malibu-500 hover:bg-malibu-500/90"
          onClick={() => addSessionModal.onOpen()}
        >
          New Session
        </Button>
      </div>
    </div>
  );
};

export default Search;
