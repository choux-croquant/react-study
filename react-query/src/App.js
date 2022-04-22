import { QueryClient, QueryClientProvider} from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import ItemList from './components/ItemList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools> */}
        <p>aaaa</p>
        <ItemList></ItemList>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default App;
