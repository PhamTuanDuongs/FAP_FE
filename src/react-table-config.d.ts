declare module "react-table" {
  import { ComponentType, ReactNode } from "react";

  export interface Column<D extends object = {}> {
    Header: string | ReactNode;
    accessor: string | ((row: D) => any);
    // Add more properties as needed
  }

  export interface TableOptions<D extends object = {}> {
    columns: Column<D>[];
    data: D[];
    initialState?: Partial<TableState<D>>;
    // Add more properties as needed
  }

  export interface TableState<D extends object = {}> {
    pageIndex: number;
    pageSize: number;
  }

  export interface UseTableInstanceProps<D extends object = {}> {
    getTableProps: () => any;
    getTableBodyProps: () => any;
    headerGroups: any;
    prepareRow: (row: any) => void;
    page: any[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: number[];
    pageCount: number;
    gotoPage: (pageIndex: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (pageSize: number) => void;
    state: TableState<D>;
  }

  export function useTable<D extends object = {}>(
    options: TableOptions<D>,
    ...plugins: any[]
  ): UseTableInstanceProps<D>;

  export function usePagination<D extends object = {}>(hooks: any[]): void;
}
