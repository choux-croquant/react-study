import { useQuery } from "react-query";
import styles from './ItemList.module.css'

const ItemList = () => {
  const { isLoading, isError, error, data } = useQuery('itemList', async () => {
    return await fetch('http://localhost:4000/itemList1').then(res => res.json())
  })

  if (isLoading) {
    return <p>Now Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <p>Item List</p>
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