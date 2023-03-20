import React, {useEffect, useState} from 'react'
import { message } from 'antd'
import 'antd/dist/reset.css';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase, ref as db_ref, refFromURL, set, child, get } from 'firebase/database'

export default function ProductItem({item}) {
    const [uid, setUid] = useState("")
    const [previous, setPrevious] = useState(0)

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
    },[])

    const addToCart = async () => {
      await get(child(db, `CART/${uid}/${item.id}/quantity`)).then((snapshot) => {
        if(snapshot.exists){
          let resp = (set(db_ref(database, 'CART/' + uid + '/' + item.id), {
            'id': item.id,
            'quantity': 1 + snapshot.val(),
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
            message.success("Product Added")
          }).catch((error) => {console.log(error)}));
        }
      })
    }

  return (
    <div class='w-3/5 border-2 border-gray-200 h-80 rounded-md flex flex-col cursor-pointer m-4 hover:border-green-400'>
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
              <p class='text-xs font-bold text-blue-400'>KES {item.price}</p>
            </div>
            <button class='bg-gray-400 m-1 rounded-md text-xs font-semibold hover:bg-green-600 p-1' onClick={addToCart}>ADD TO CART</button>
        </div>
    </div>
  )
}
