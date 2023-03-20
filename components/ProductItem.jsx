import React, {useEffect} from 'react'

export default function ProductItem({item}) {
    useEffect(() => {
        console.log(item)
    },[])

  return (
    <div class='w-3/5 border-2 border-gray-200 h-80 rounded-md flex flex-col cursor-pointer m-4'>
        <div class='h-2/3 w-full'>
          <img class='w-full h-full p-2' src={item.images[0]}/>
        </div>
        <div class='h-1/2 w-full flex flex-col justify-around p-2'>
            <div class='w-full flex justify-center'>
              <p class='text-xs font-semibold'>{item.title}</p>
            </div>
            <div class='w-full flex justify-center'>
              <p class='text-xs text-ellipsis overflow-hidden leading-3 text-green-600'>{item.description}</p>
            </div>
            <div class='w-full flex justify-center'>
              <p class='text-xs font-bold text-blue-400'>KSHS {item.price}</p>
            </div>
            <button class='bg-gray-400 m-1 rounded-md text-xs font-semibold hover:bg-green-600 p-1'>ADD TO CART</button>
        </div>
    </div>
  )
}
