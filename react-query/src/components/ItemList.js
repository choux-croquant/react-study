import { useQuery, useMutation } from "react-query";
import styles from './ItemList.module.css'
import useWishItemListData from "../hooks/useWishItemListData";
import { useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const { isLoading, isFetching, isError, error, refetch, data } = useQuery('itemList', async () => {
    const response = await fetch('http://localhost:4000/itemList')

    if (!response.ok) {
      throw new Error(error)
    }
    return response.json()
  }, {
    cacheTime: 50000,
    staleTime: 500000,
  })

  // useMutation Example
  const itemMutation = useMutation(newItem => {
    return axios.post('http://localhost:4000/itemList', newItem)
  })

  const wishItemdata = useWishItemListData().data

  const addItemHandler = () => {
    console.log(itemName, itemPrice)
    const newItem = { itemName, itemPrice }
    itemMutation.mutate(newItem)
  }

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
      <div>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <input type="text" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
        <button onClick={addItemHandler}>Add Item</button>
      </div>
      {data?.map((item) => {
        return(
          <div className={styles.itemContainer}>
            <div>{item.itemName}</div>
            <div>{item.itemPrice}</div>
          </div>
        )
      })}
      {wishItemdata?.map((item) => {
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