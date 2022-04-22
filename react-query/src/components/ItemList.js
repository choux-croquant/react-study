import { useQuery } from "react-query";
import styles from './ItemList.module.css'

const ItemList = () => {
  const { isLoading, isFetching, isError, error, refetch, data } = useQuery('itemList', async () => {
    const response = await fetch('http://localhost:4000/itemList')

    if (!response.ok) {
      throw new Error(error)
    }
    return response.json
  }, {
    cacheTime: 50000,
    staleTime: 500000,
  })

  console.log(isLoading, isFetching)

  if (isLoading) {
    return <p>Now Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <p>Item List</p>
      {/* manually refetch data */}
      <button onClick={refetch}>Refetch!</button>
      {data?.map((item) => {
        return(
          <div className={styles.itemContainer}>
            <div>{item.itemName}</div>
            <div>{item.itemPrice}</div>
          </div>
        )
      })}
    </>
  )
}

export default ItemList;