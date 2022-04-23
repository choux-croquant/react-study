import { useQuery } from 'react-query';
import { useState } from 'react';

const PaginationList = () => {
  const [page, setPage] = useState(0)

  const fetchProjects = (page) => fetch('http://localhost:4000/paginationItem?_limit=2&_page=' + (page+1)).then((res) => res.json())

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(['projects', page], () => fetchProjects(page), { keepPreviousData : true })
  console.log(data)
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map(data => (
            <p key={data.id}>{data.itemName}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData) {
            setPage(old => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  )
}

export default PaginationList;