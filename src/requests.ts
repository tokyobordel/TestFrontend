import type { ColumnFiltersState } from "@tanstack/react-table";

const env = import.meta.env
const backend_host = env.VITE_BACKEND_HOST

type SortingParams = Array<{ id: string; desc: boolean }>;
type filterParams = Array<{ id: string; value: string }>;

const requests = {

    "get_supercharger_types": {
        "url": backend_host + "/getComponents/Supercharger",
        "method": "get",
    },
    "get_engine_config_types": {
        "url": backend_host + "/getComponents/EngineConfig",
        "method": "get",
    },
    "get_engine_types": {
        "url": backend_host + "/getComponents/Engine",
        "method": "get",
    },
    "get_engines": function(pageIndex: number, pageSize: number, sort?: SortingParams, columnFilters?: ColumnFiltersState) {
        console.log(columnFilters)
        let sortString = "";
        for(const param of sort || []) {
            sortString += "&sortingColumn=" + param.id + "&sortingOrder=" + (param.desc ? "desc" : "asc");
        }

        let columnFiltersString = "";
        for(const param of columnFilters || []) {
            sortString += "&" + param.id + "=" + param.value;
        }

        return {
            "url": backend_host + "/getEngines?pageIndex=" + pageIndex + "&pageSize=" + pageSize + sortString + columnFiltersString,
            "method": "get",
        }
    },
}

export default requests