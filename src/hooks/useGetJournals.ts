import type { JournalRecord } from '@/content/tables/JournalTable'
import { BACKEND_URL } from '@/hooks/constants'
import axios from 'axios'
import useAxios from 'axios-hooks'
import type { MRT_ColumnFiltersState, MRT_SortingState } from 'material-react-table'
import { useCallback } from 'react'

type Props = {
	fetchSize: number,
	page: number,
	sorting: MRT_SortingState,
	signal?: AbortSignal
}

const workTypes = ['Ремонт', 'Обслуживание', 'Монтаж', 'Демонтаж', 'Диагностика', 'Настройка']
const employees = ['Иванов И.И.', 'Петров П.П.', 'Сидоров С.С.', 'Козлов К.К.', 'Морозов М.М.']
const volumes = ['2 часа', '4 часа', '1 день', '8 часов', '3 часа', '6 часов']

const generateDate = (startDate: Date, daysOffset: number): string => {
  const date = new Date(startDate)
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split('T')[0]
}

const data: JournalRecord[] = Array.from({ length: 100 }, (_, index) => ({
  ID: index + 1,
  executionDate: generateDate(new Date('2024-01-01'), index),
  workType: workTypes[index % workTypes.length],
  workVolume: volumes[index % volumes.length],
  employee: employees[index % employees.length]
}))


const useGetJournals = () => {
	const request = {
		url: BACKEND_URL + "/get_journals",
		method: "GET",
	}

	const [{}, execute] = useAxios<JournalRecord[]>(request, {useCache: false, manual: true })

	const getJournals = useCallback(
		async (props: Props) => {
			let patientNumberFilter = null
			let statusFilter = null
			let userFilter = null
			let expertFilter = null
			console.log(1111)
			/* for(const filterIndex in props.columnFilters) {
				const filter = props.columnFilters[filterIndex]
				if(filter.id == "Status") {
					statusFilter = filter.value
				}
				if(filter.id == "Users") {
					userFilter = filter.value
				}
				if(filter.id == "Experts") {
					expertFilter = filter.value
				}
				if(filter.id == "OrthancGlobalID") {
					patientNumberFilter = filter.value
				}
			} */

            /* const result = await execute({
				signal: props.signal,
                params: {
					current_page: props.page,
					rows_per_page: 20,
					status: statusFilter,
					user: userFilter,
					expert: expertFilter,
					patient_number_filter: patientNumberFilter,
					sorted_column: props.sorting,
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

			 return result.data; */
			const start = props.page * props.fetchSize
      		const pageData = data.slice(start, start + props.fetchSize)
			return pageData;
		}, [execute]
	)

	return {
		getJournals
	};	
}

export default useGetJournals
