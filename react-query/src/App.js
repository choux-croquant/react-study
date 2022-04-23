import { QueryClient, QueryClientProvider} from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import ItemList from './components/ItemList'
import PaginationList from './components/paginationList';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ItemList />} />
          {/* <Route path='/pagination'></Route> */}
          <Route path='/pagination' element={<PaginationList />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
