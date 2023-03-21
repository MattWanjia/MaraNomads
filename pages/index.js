import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductItem from '@/components/ProductItem'
import {IoIosSearch} from 'react-icons/io'
import {GiCancel} from 'react-icons/gi'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchWord, setSearchWord] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    let URL = "https://dummyjson.com/products?limit=10"

    axios.get(URL).then((res) => {
      setProducts(res.data.products)
      setFilteredProducts(res.data.products)
    }).catch((err) => console.log(err))
  }

  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearchWord(e.target.value)

    var ps =  products.filter((element) => {
      let title_lower = (element.title).toLowerCase()
      let category_lower = (element.category).toLowerCase()
      
      return title_lower.includes((e.target.value).toLowerCase())  || category_lower.includes((e.target.value))
    })

    setFilteredProducts(ps)
  }

  return (
    <>
      <div class='w-full relative flex justify-center'>
        <div class='absolute right-0 p-1'>
          <IoIosSearch class='cursor-pointer' onClick={() => {setIsSearching(!isSearching); setFilteredProducts(products)}} size={30}/>
        </div>
        <div class='w-1/2 p-1 relative'>
          {isSearching && <input onChange={(e) => handleSearch(e)} class='w-full p-1 border-2 border-gray-400 rounded-md' placeholder='Start typing to search'/>}
          {isSearching && <div class='absolute right-2 top-3'>
            <GiCancel class='cursor-pointer' onClick={() => {setIsSearching(false); setSearchWord(""); setFilteredProducts(products)}} size={20}/>
          </div>}
        </div>
      </div>
      <div class='w-full h-screen   grid grid-cols-1 md:grid-cols-4  gap-2 m-4 place-items-center'>
          {filteredProducts && filteredProducts.map((product, key) => <ProductItem item={product}/>)}
      </div>
    </>
  )
}
