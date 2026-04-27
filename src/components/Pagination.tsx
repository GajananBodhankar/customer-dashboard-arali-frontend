interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <button
        className="px-3 py-1 rounded bg-gray-800 text-white disabled:bg-gray-300"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        Prev
      </button>

      {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
        <button
          className={`px-3 py-1 rounded ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-white text-gray-700 shadow"
          }`}
          key={page}
          onClick={() => onPageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded bg-gray-800 text-white disabled:bg-gray-300"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
