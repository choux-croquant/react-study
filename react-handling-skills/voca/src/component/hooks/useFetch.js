import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(url)
        .then(res => {
            return res.json()
        })
        .then(data => {
           setData(data); 
        })
    }, [url]);

    return data;
}

//커스텀 훅을 통해 반복되는 작업 통합