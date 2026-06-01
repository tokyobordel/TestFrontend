import type { JournalRecord } from '@/content/tables/JournalTable'
import { BACKEND_URL } from '@/hooks/constants'
import axios from 'axios'
import useAxios from 'axios-hooks'
import type { MRT_SortingState } from 'material-react-table'
import { useCallback } from 'react'

type Props = {
	fetchSize: number,
	page: number,
	sorting: MRT_SortingState,
	dateStart?: string,
	dateEnd?: string,
	signal?: AbortSignal
}


const useGetJournals = () => {
	const request = {
		url: BACKEND_URL + "/get_records",
		method: "GET",
	}

	const [{}, execute] = useAxios<{ data: JournalRecord[], total: number }>(request, {useCache: false, manual: true })

	const getJournals = useCallback(
		async (props: Props) => {
            const result = await execute({
				signal: props.signal,
                params: {
					dateStart: props.dateStart,
					dateEnd: props.dateEnd,
					current_page: props.page,
					rows_per_page: props.fetchSize,
					sorted_column: props.sorting.length == 0 ? 'id' : props.sorting[0].id,
					order: props.sorting.length == 0 ? 'asc' : ((props.sorting[0].desc ? "desc" : "asc"))
				},
            }).catch((error) => {
				if (axios.isCancel(error)) {
					console.log('Запрос отменён:', error.message);
					return Promise.reject(error);
				}
				console.log(error);
				throw error;
			});

			 return result.data;

			/* const start = props.page * props.fetchSize
      		const pageData = data.slice(start, start + props.fetchSize)
			return pageData; */
		}, [execute]
	)

	return {
		getJournals
	};	
}

export default useGetJournals
