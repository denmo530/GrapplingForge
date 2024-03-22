"use client";

import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";

const SessionPagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
            href={createPageURL(currentPage - 1)}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className="cursor-pointer"
                isActive={currentPage === page}
                href={createPageURL(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
            href={createPageURL(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SessionPagination;
