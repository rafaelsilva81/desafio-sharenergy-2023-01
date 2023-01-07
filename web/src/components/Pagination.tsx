import { CaretLeft, CaretRight } from "phosphor-react";

const Pagination = ({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage((prevPage) => prevPage - 1)}
        className="hover:text-primary disabled:pointer-events-none disabled:opacity-50"
      >
        <CaretLeft weight="fill" />
      </button>
      {page}
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className="hover:text-primary disabled:pointer-events-none disabled:opacity-50"
      >
        <CaretRight weight="fill" />
      </button>
    </div>
  );
};

export default Pagination;
