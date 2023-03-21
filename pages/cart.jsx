import React, {useEffect, useState} from 'react'
import {FaArrowLeft} from 'react-icons/fa'
import { useRouter } from 'next/router'
import CartItem from '@/components/CartItem'
import { child, get, getDatabase, ref as db_ref, refFromURL, set, remove, update } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { message } from 'antd'
import 'antd/dist/reset.css';
import axios from 'axios'


export default function Cart() {
  const router = useRouter()
  const [products, setProducts] = useState({})
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [phone, setPhone] = useState(0)

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
          //console.log(snapshot.val())
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
  }, [products])


  const getTotal = () => {
    let total = 0

    for (const key in products){

      let item = products[key]
      //console.log(products[key])

      let price = item.price
      let quantity = item.quantity

      let ptotal = price * quantity
      total += ptotal
      
      //console.log(total)
    }
    setTotal(total)
    return total
  }

  const removeProduct = (id) => {
    //products.remove(id)
    delete products.id
    //console.log(typeof(products))
  }

  const checkOut = () => {
    //console.log(phone[0])

    if(phone.length < 12 ){
      message.info("Confirm mobile number")
    }else if(phone[0] != 2 && phone[1] != 5 && phone[2] != 4){
      message.info("Confirm mobile number and try again")
    }
    else{
      let URL = "https://maranomads-c45b7.ue.r.appspot.com/checkout"

      let datas = new FormData()

      datas.append('order', window.localStorage.getItem("uid"))
      datas.append('phone', phone)

      axios.post(URL, datas).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div class='w-screen h-screen bg-gray-100 flex items-center justify-center'>
      <div class='w-5/6 h-5/6 bg-white pl-2'>
          <div class='w-full h-10 flex flex-row items-center'>
            <FaArrowLeft class='cursor-pointer' onClick={() => router.push('/')}/>
            <p class='pl-2 font-semibold'>Continue Shopping</p>
          </div>
          <div class='w-full h-5/6 flex flex-row'>
            <div class='w-2/3 h-full p-3 flex flex-col space-y-2 overflow-y-auto'>
              {products && Object.entries(products).map(([key,value]) => <CartItem item={value} key={key} removeProduct={removeProduct}/>)}
            </div>
            <div class='w-1/3 flex flex-col p-2 space-y-2'>
              <div class='w-full flex justify-center'><p class='text-2xl font-semibold'>CHECKOUT</p></div>
              <div class='w-full flex flex-row'>
                <p class='font-semibold'>TOTAL:&nbsp;</p>
                <p class='font-semibold'>KES&nbsp;{total}</p>
              </div>
              <div class='w-full flex justify-center'>
                <img class='w-1/4' src='mpesa.jpg'/>
              </div>
              <input type={'number'} class='p-1 border-2 border-gray-400 rounded-md' onChange={(e) => setPhone(e.target.value)} placeholder='254712345678'/>
              <button onClick={checkOut} class='p-1 bg-blue-400 rounded-md font-semibold'>PROCEED</button>
            </div>
          </div>
      </div>
    </div>
  )
}
