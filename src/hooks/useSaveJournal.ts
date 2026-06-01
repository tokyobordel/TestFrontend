import type { JournalRecord } from '@/content/tables/JournalTable'
import { BACKEND_URL } from '@/hooks/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from 'axios-hooks'
import type { MRT_TableOptions } from 'material-react-table'


const useSaveJournal = () => {
	const request = {
		url: BACKEND_URL + "/save_record",
		method: "POST",
	}

	const [{ data }, execute] = useAxios(request, {useCache: false, manual: true })

	const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (record: MRT_TableOptions<JournalRecord>) => {
            return await execute({
                data: record
            });
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['journals-list'] }),
    });

}

export default useSaveJournal
