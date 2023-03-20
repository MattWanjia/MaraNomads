import React, {useEffect, useState} from 'react'
import { BiTrash } from 'react-icons/bi'
import { useRouter } from 'next/router'
import axios from 'axios'
import {IoMdRemove, IoIosAdd} from 'react-icons/io'
import { message } from 'antd'
import 'antd/dist/reset.css';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase, ref as db_ref, refFromURL, set, child, get, remove } from 'firebase/database'


export default function CartItem({item, removeProduct}) {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [uid, setUid] = useState("")
    const [quantity, setQuantity] = useState(item.quantity)
    const [removed, setRemoved] = useState(false)
    const router = useRouter()

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
    const database = getDatabase(app)
    const db = db_ref(getDatabase(app))

    useEffect(() => {
        //console.log(item)
        setUid(window.localStorage.getItem("uid"))
        fetchProduct()
    }, [product])

    const decreaseProducts = async () => {
        if(quantity > 0){
            
            await get(child(db, `CART/${uid}/${item.id}/quantity`)).then((snapshot) => {
                if(snapshot.exists){
                  let resp = (set(db_ref(database, 'CART/' + uid + '/' + item.id), {
                    'id': item.id,
                    'quantity':snapshot.val() - 1,
                    'price' : item.price
                  }).then(() => {
                    message.success("Product Updated")
                  }).catch((error) => {console.log(error)}));
                }
                else{
                  let resp = (set(db_ref(database, 'CART/' + uid + '/' + item.id), {
                    'id': item.id,
                    'quantity': 1,
                  }).then(() => {
                    //message.success("Product Added")
                  }).catch((error) => {console.log(error)}));
                }
            })

            let newQuant = quantity - 1
            setQuantity(newQuant)
        }
    }

    const increaseProducts = async () => {
        await get(child(db, `CART/${uid}/${item.id}/quantity`)).then((snapshot) => {
            if(snapshot.exists){
              let resp = (set(db_ref(database, 'CART/' + uid + '/' + item.id), {
                'id': item.id,
                'quantity': 1 + snapshot.val(),
                'price' : item.price
              }).then(() => {
                //message.success("Product Updated")
              }).catch((error) => {console.log(error)}));
            }
            else{
              let resp = (set(db_ref(database, 'CART/' + uid + '/' + item.id), {
                'id': item.id,
                'quantity': 1,
              }).then(() => {
                message.success("Product Added")
              }).catch((error) => {console.log(error)}));
            }
        })

        let newQuant = quantity + 1
        setQuantity(newQuant)
    }

    const deleteProdcts = async () => {
        await(remove(child(db, `CART/${uid}/${item.id}`)).then(() => {
            setRemoved(true)
            //router.reload()
            removeProduct(item.id)
            message.success("PRODUCT REMOVED")
        }))  
    }

    const fetchProduct = () => {
        let URL = `https://dummyjson.com/products/${item.id}`

        axios.get(URL).then((res) => {
        //console.log(res.data)
        setProduct(res.data)
        setLoading(false)
        let price = res.data.price
        //console.log(price)
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
                <p>{quantity}</p> 
                <IoIosAdd onClick={increaseProducts} class='cursor-pointer'/>
            </div>
            <div class='w-1/5 flex flex-row justify-around items-center'>
                <p class='font-semibold'>KES {total}</p>
                <BiTrash onClick={deleteProdcts} class='cursor-pointer' size={20}/>
            </div>
        </div> : <div class='w-full h-1/5 rounded-md border-2 border-gray-300 flex flex-row justify-around'></div>}
    </>
  )
}
