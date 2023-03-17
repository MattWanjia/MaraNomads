import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    //fetchProducts()
  }, [])

  const fetchProducts = () => {
    let URL = "https://dummyjson.com/products?limit=10"

    axios.get(URL).then((res) => {
      console.log(res.data)
      //setProducts(res.data.products)
    }).catch((err) => console.log(err))
  }

  return (
    <>
      <div class='w-full h-screen grid grid-cols-6 gap-3'>
          
      </div>
    </>
  )
}
