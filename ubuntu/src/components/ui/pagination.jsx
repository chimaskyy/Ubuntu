/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Pagination({
  hasMoreItems,
  onLoadMore,
  loading = false,
  className = "flex justify-center mt-8",
}) {
  if (!hasMoreItems) return null;

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        className="min-w-[200px] bg-gray-900 text-white mb-6"
        disabled={loading}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load More"}
      </Button>
    </div>
  );
}
export default Pagination;