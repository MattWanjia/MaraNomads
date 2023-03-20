import React, {useEffect, useState} from 'react'
import { BiTrash } from 'react-icons/bi'
import axios from 'axios'
import {IoMdRemove, IoIosAdd} from 'react-icons/io'

export default function CartItem({item}) {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        //console.log(item)
        fetchProduct()
    }, [])

    const decreaseProducts = async () => {

    }

    const increaseProducts = async () => {
        
    }

    const deleteProdcts = async () => {
        
    }

    const fetchProduct = () => {
        let URL = `https://dummyjson.com/products/${item.id}`

        axios.get(URL).then((res) => {
        console.log(res.data)
        setProduct(res.data)
        setLoading(false)
        let price = res.data.price
        console.log(price)
        setTotal((item.quantity * 1) * (price*1))
        }).catch((err) => console.log(err))
    }


  return (
    <>
        {!loading ? <div class='w-full h-1/5 rounded-md border-2 border-gray-300 flex flex-row justify-around'>
            <div class='h-full w-1/6 flex items-center justify-center'>
                <img class='h-5/6 w-5/6' src={product.images[0]}/>
            </div>
            <div class='flex flex-col h-full w-2/5 justify-around'>
                {<p>{product.title}</p>}
                <p class='text-xs'>{product.description}</p>
            </div>
            <div class='flex flex-row w-1/6 items-center justify-around'>
                <IoMdRemove onClick={decreaseProducts} class='cursor-pointer'/>
                <p>{item.quantity}</p> 
                <IoIosAdd onClick={increaseProducts} class='cursor-pointer'/>
            </div>
            <div class='w-1/5 flex flex-row justify-around items-center'>
                <p class='font-semibold'>KSHS {total}</p>
                <BiTrash onClick={deleteProdcts} class='cursor-pointer' size={20}/>
            </div>
        </div> : <div class='w-full h-1/5 rounded-md border-2 border-gray-300 flex flex-row justify-around'></div>}
    </>
  )
}
