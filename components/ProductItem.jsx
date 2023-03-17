import React, {useEffect} from 'react'

export default function ProductItem({item}) {
    useEffect(() => {
        console.log(item)
    },[])

  return (
    <div class='w-1/2 border-2 border-gray-200 h-48 rounded-md'>
        
    </div>
  )
}
