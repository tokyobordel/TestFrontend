import type { JournalRecord } from '@/content/tables/JournalTable'
import { BACKEND_URL } from '@/hooks/constants'
import axios from 'axios'
import useAxios from 'axios-hooks'
import type { MRT_SortingState } from 'material-react-table'
import { useCallback } from 'react'

type Props = {
	id: number,
	signal?: AbortSignal
}


const useGetRecord = () => {
	const request = {
		url: BACKEND_URL + "/get_record",
		method: "GET",
	}

	const [{}, execute] = useAxios<JournalRecord>(request, {useCache: false, manual: true })

	const getRecord = useCallback(
		async (props: Props) => {
            const result = await execute({
				signal: props.signal,
                params: {
					id: props.id,
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
		getRecord
	};	
}

export default useGetRecord
