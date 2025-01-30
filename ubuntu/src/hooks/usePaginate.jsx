import { useState, useEffect, useMemo } from "react";

export function usePagination({
  data = [],
  itemsPerPage = 12,
  initialPage = 1
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedItems, setDisplayedItems] = useState([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const hasMoreItems = currentPage < totalPages;

  // Calculate paginated items
  useEffect(() => {
    const endIndex = currentPage * itemsPerPage;
    setDisplayedItems(data.slice(0, endIndex));
  }, [data, currentPage, itemsPerPage]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const reset = () => {
    setCurrentPage(initialPage);
  };

  return {
    currentPage,
    displayedItems,
    hasMoreItems,
    loadMore,
    reset,
    totalItems: data.length
  };
}