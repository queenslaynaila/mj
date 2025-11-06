export type TableFilterConfig = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
};

export type TablePaginationConfig = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};