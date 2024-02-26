"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

type PaginationComponentI = {
  currentPage?: number;
  onPageChange?: (newPage: number) => void;
  pages?: number;
};

const PaginationComponent = (props: PaginationComponentI) => {
  const { currentPage = 1, pages = 1, onPageChange = () => ({}) } = props;

  const [activePage, setActivePage] = useState(currentPage);

  const handleChangePage = (newPage: number) => {
    const page = Math.max(1, Math.min(newPage, Math.ceil(pages)));
    if (page !== activePage) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="w-full mt-8">
      <ol className="flex justify-center gap-2 text-sm">
        <li>
          <button
            onClick={() => handleChangePage(activePage - 1)}
            className="inline-flex size-8 items-center justify-center rounded border border-primary-100 bg-background-200 text-primary-100 transition hover:text-primary-500"
          >
            <span className="sr-only">Prev Page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        </li>

        {Array.from(Array(Math.ceil(pages)).keys()).map((page) => (
          <li key={`page-${page + 1}`}>
            <button
              onClick={
                page + 1 !== activePage
                  ? () => handleChangePage(page + 1)
                  : undefined
              }
              className={clsx(
                "block size-8 rounded border text-center leading-8 border-primary-100 bg-background-200 text-primary-100 transition hover:text-primary-500",
                page + 1 === activePage &&
                  "font-medium !text-secondary-500 hover:text-secondary-600"
              )}
            >
              <span className="sr-only">Go to page {page + 1}</span>
              {page + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => handleChangePage(activePage + 1)}
            className="inline-flex size-8 items-center justify-center rounded border border-primary-100 bg-background-200 text-primary-100 transition hover:text-primary-500"
          >
            <span className="sr-only">Next Page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </li>
      </ol>
    </div>
  );
};
export default PaginationComponent;
