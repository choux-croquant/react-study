// useQuery훅을 활용하여 api에 맞게 커스텀 훅 만들기
import { useQuery } from "react-query";

const fetchWishListItem = async () => {
  const response = await fetch('http://localhost:4000/wishItemList');
  if (!response.ok) {
    throw new Error('Some Error')
  }
  return response.json()
}

const useWishItemListData = (onSuccess, onError) => {
  return(
    useQuery('wishItemList', fetchWishListItem,
      {
        cacheTime: 50000,
        staleTime: 500000,
      }
    )
  )
}

export default useWishItemListData;