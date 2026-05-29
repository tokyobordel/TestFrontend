import JournalTable from "../tables/JournalTable"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';


const queryClient = new QueryClient()
function MainPage() {
    return (
      <QueryClientProvider client={queryClient}>
          <JournalTable/>
      </QueryClientProvider>
    )
}

export default MainPage