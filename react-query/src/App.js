import { QueryClient, QueryClientProvider} from 'react-query';
import './App.css';
import ItemList from './components/ItemList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemList></ItemList>
    </QueryClientProvider>
  );
}

export default App;
