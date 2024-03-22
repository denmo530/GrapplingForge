"use client";
import React, { useState } from "react";
import SearchFilterItem from "./SearchFilterItem";

const SearchFilters = ({ setFilters }: { setFilters: any }) => {
  const handleFilterChange = (filter: string, toggled: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filter.toLowerCase().replace(/\s+/g, "")]: toggled,
    }));
  };

  return (
    <div className="w-full flex gap-2 overflow-x-scroll pb-6 md:pb-1">
      <SearchFilterItem
        filter={"Sparring"}
        filterHandler={handleFilterChange}
      />
      <SearchFilterItem
        filter={"Drilling"}
        filterHandler={handleFilterChange}
      />
      <SearchFilterItem
        filterHandler={handleFilterChange}
        filter={"Conditioning"}
      />
      <SearchFilterItem
        filter={"Very Low"}
        filterHandler={handleFilterChange}
      />
      <SearchFilterItem filter={"Low"} filterHandler={handleFilterChange} />
      <SearchFilterItem
        filter={"Moderate"}
        filterHandler={handleFilterChange}
      />
      <SearchFilterItem filter={"High"} filterHandler={handleFilterChange} />
      <SearchFilterItem filter={"Extreme"} filterHandler={handleFilterChange} />
    </div>
  );
};

export default SearchFilters;
