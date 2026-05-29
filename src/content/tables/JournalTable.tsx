import useAxios from "axios-hooks"
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
//import AddEngineForm from "content/forms/AddEngineForm";
import { createTheme, IconButton, ThemeProvider } from "@mui/material";
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { LuCirclePlus } from "react-icons/lu";
import { DashLoading } from "respinner";
import { MdErrorOutline } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import './JournalTable.css'

import useGetJournals from "@/hooks/useGetJournals";



export type JournalRecord = {
  ID: number
  executionDate: string
  workType: string
  workVolume: string
  employee: string
}

function JournalTable() {

    const [isAddEngineFormOpened, setAddEngineFormOpenedd] = useState(false);

    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const columns = useMemo<MRT_ColumnDef<JournalRecord>[]>(
        () => [
            {
                accessorKey: 'executionDate',
                header: 'Дата выполнения работы',
                size: 150,
            },
            {
                accessorKey: 'workType',
                header: 'Тип работы',
                size: 150,
            },
            {
                accessorKey: 'workVolume',
                header: 'Объем работы',
                size: 150,
            },
            {
                accessorKey: 'employee',
                header: 'Исполнитель',
                size: 150,
            },
        ],
        [],
    );

    const { getJournals } = useGetJournals();

    // table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    });

    const { data, isError, isFetching, isLoading, refetch } = useQuery(
        {
            queryKey: [
                'journals-list',
                {
                    columnFilters, //refetch when columnFilters changes
                    globalFilter, //refetch when globalFilter changes
                    sorting, //refetch when sorting changes,
                    page: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                },
            ],
            queryFn: async ({ signal }: { signal?: AbortSignal }) => {
                setRowCount(100) // todo: брать из backend
                return {
                    data: await getJournals({
                        fetchSize: pagination.pageSize, 
                        page: pagination.pageIndex,
                        sorting,
                        signal
                    }),
                    meta: {
                        totalRowCount: 100, // todo: брать из backend
                    }
                }
            },
            select: (response) => response.data,
            refetchOnWindowFocus: false,
        }
    );

    const tableTheme = createTheme({
    components: {
        MuiMenu: {
        styleOverrides: {
            paper: {
            backgroundColor: '#333',   // фон меню
            color: '#fff',
            },
        },
        },
        MuiMenuItem: {
        styleOverrides: {
            root: {
            '&:hover': {
                backgroundColor: '#555',
            },
            },
        },
        },
    },
    });

    const table = useMaterialReactTable({
        columns,
        data: data ?? [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        localization: MRT_Localization_RU,
        paginationDisplayMode: 'pages',
        enableStickyHeader: true,
        enableStickyFooter: true,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        /* muiToolbarAlertBannerProps: error != null
        ? {
            children: 'Ошика при загрузке данных',
        }
        : undefined, */
        state: {   
            density: 'compact',
            columnFilters,
            globalFilter,
            /* isLoading: loading, */
            pagination,
            /* showAlertBanner: error != null, */
            showProgressBars: isRefetching,
            sorting,
        },
        muiTablePaperProps: { sx: 
            { 
                boxShadow: "none",
                borderRadius: 0, 
                borderSpacing: "0",
                marginTop: "var(--main-padding)",
                marginBottom: "var(--main-padding)",
                '& .MuiAlert-colorInfo': {
                    backgroundColor: "var(--hover-color)",
                },
                background: "transparent",
                height: '100%',
                margin: "0 auto",
                width: "100dvw",
                display: "flex",
                flexDirection: "column",
            } 
        }, // весь бокс таблицы
        muiTableContainerProps: { 
            sx: { 
                borderRadius: 0,
                backgroundColor: "#4d4d4d",
                color: "white",
                /* height: '50%', */
                '& .MuiTypography-root': {
                    color: "white"
                }
            } 
        }, // внутренняя таблица 
        muiTableBodyRowProps: { 
            sx: { 
                backgroundColor: "#4d4d4d" 
            } 
        }, // Стиль для строк тела таблицы
        muiTableBodyCellProps: { 
            sx: { 
                color: "white" 
            } 
        }, // Стиль для ячеек тела таблицы
        muiTableFooterRowProps: { 
            sx: { 
                backgroundColor: "var(--accent-color)",
            }
        }, // Стиль для строк футера таблицы
        muiBottomToolbarProps: { 
            sx: { 
                backgroundColor: "var(--accent-color)", 
                //overflow: "none",
                minHeight: "80px",
                color: "white",
                padding: "0",
                margin: '0',
                '& .MuiFormLabel-root': { // Стили для текста "Страница 1 из 10"
                    color: 'white',
                    fontStyle: 'italic',
                },
                '& .MuiSelect-select, & .MuiNativeSelect-select': { // Стили для текста "10" в селекте количества строк
                    color: 'white',
                    fontWeight: 'bold',
                },
                '& .MuiButtonBase-root': {
                    backgroundColor: "var(--secondary-color)"
                },
                '& .MuiTablePagination-root': {
                    flexFlow: "column wrap",
                    padding: "5px",
                    //margin: "0",
                    gap: "0"
                },
            } 
        }, // Стиль для нижней панели инструментов таблицы
        muiTopToolbarProps: { 
            sx: { 
                backgroundColor: "var(--secondary-color)", 
                borderRadius: "none" 
            } 
        }, // Стиль для верхней панели инструментов таблицы
        muiTableHeadCellProps: { 
            sx: { 
                backgroundColor: "var(--accent-color)" 
            } 
        }, // Стиль для ячеек заголовка таблицы
        muiPaginationProps: {
            siblingCount: 0,    // не показываем соседние страницы
            boundaryCount: 0,   // не показываем первую и последнюю
            SelectProps: {
                native: false,
                MenuProps: {
                    PaperProps: {
                        sx: {
                            backgroundColor: 'var(--main-bg-color)', // фон всего выпадающего списка
                            '& .MuiMenuItem-root': {
                                color: 'white', // цвет текста
                            },
                            '& .MuiMenuItem-root:hover': {
                                backgroundColor: 'var(--accent-color)',
                            },
                        },
                    },
                },
            },
            sx: {
                //bgcolor: "white !important",
                '& button': {
                    color: 'white',
                },
                '& .MuiPaginationItem-root': {
                    color: 'white',
                },
                '& .MuiPaper-root': {
                    backgroundColor: "red !important"
                },
            },
        },
        renderTopToolbarCustomActions: ({ table }) => ( // для добавления своих кнопок в начало тулбара
            <div>
                <IconButton  onClick={() => {
                    setAddEngineFormOpenedd(!isAddEngineFormOpened)
                }}>
                    <LuCirclePlus size={25} />
                </IconButton >
                {/* <IconButton>
                    {
                        loading 
                            ? <DashLoading size={28} color="white" /> 
                            : error 
                                ? <MdErrorOutline size={28}/> 
                                : null
                    }
                </IconButton > */}
                {/*error ? "Ошибка" : null*/}
            </div>
        ),
        renderToolbarInternalActions: ({ table }) => ( // для добавления своих кнопок в конец тулбара, после всех встроенных
            <>
                {/* add your own custom print button or something */}
                {/* built-in buttons (must pass in table prop for them to work!) */}
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ToggleFiltersButton table={table} />
                {/*<MRT_ToggleDensePaddingButton table={table} />*/}
                <MRT_ShowHideColumnsButton table={table} />
                {/*<MRT_ToggleFullScreenButton table={table} />*/}
            </>
        ),
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default JournalTable

