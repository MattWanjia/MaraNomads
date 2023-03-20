import React, {useEffect, useState} from 'react'
import {FaArrowLeft} from 'react-icons/fa'
import { useRouter } from 'next/router'
import CartItem from '@/components/CartItem'
import { child, get, getDatabase, ref as db_ref, refFromURL, set, remove, update } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { message } from 'antd'
import 'antd/dist/reset.css';


export default function Cart() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUid = window.localStorage.getItem('uid')
    const firebaseConfig = {
      apiKey: "AIzaSyCDe026gyC1C-eUBk3JJ-uRWZQGOkWxGv8",
      authDomain: "maranomads-c45b7.firebaseapp.com",
      databaseURL: "https://maranomads-c45b7-default-rtdb.firebaseio.com",
      projectId: "maranomads-c45b7",
      storageBucket: "maranomads-c45b7.appspot.com",
      messagingSenderId: "496579505547",
      appId: "1:496579505547:web:a0b510e0fd8b556191138e",
      measurementId: "G-37327RDMD4"
    };
    const app = initializeApp(firebaseConfig);
    const db = db_ref(getDatabase(app))

    setTimeout(function(){
      get(child(db, `CART/${storedUid}`)).then((snapshot) => {
        if(snapshot.exists){
          console.log(snapshot.val())
          setProducts(snapshot.val())        
        }else{
          console.log("No products available")
        }
      }).then(() => {
        
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setTotal(getTotal())
        setLoading(false)        
      })
    } , 2000)
  }, [])


  const getTotal = () => {
    let total = 0

    for (const key in products){

      let item = products[key]
      console.log(products[key])

      let price = item.price
      let quantity = item.quantity

      let ptotal = price * quantity
      total += ptotal
      
      console.log(total)
    }
    setTotal(total)
    return total
  }


  return (
    <div class='w-screen h-screen bg-gray-100 flex items-center justify-center'>
      <div class='w-5/6 h-5/6 bg-white pl-2'>
          <div class='w-full h-10 flex flex-row items-center'>
            <FaArrowLeft onClick={() => router.push('/')}/>
            <p class='pl-2 font-semibold'>Continue Shopping</p>
          </div>
          <div class='w-full h-5/6 flex flex-row'>
            <div class='w-2/3 h-full p-3 flex flex-col space-y-2 overflow-y-auto'>
              {products && Object.entries(products).map(([key,value]) => <CartItem item={value} key={key}/>)}
            </div>
            <div class='w-1/3'>
              CHECKOUT
            </div>
          </div>
      </div>
    </div>
  )
}
