import { BACKEND_URL } from '@/hooks/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from 'axios-hooks'

const useDeleteJournal = () => {
	const request = {
		url: BACKEND_URL + "/delete_record",
		method: "POST",
	}

	const [{ data }, execute] = useAxios(request, {useCache: false, manual: true })

	const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await execute({
                data: {
                    id
                }
            });
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['journals-list'] }),
    });

}

export default useDeleteJournal
