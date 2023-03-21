import React, {useState, useEffect, useContext, useMemo} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  getAuth,signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut } from "firebase/auth";
import { useDisclosure, Modal, ModalBody, ModalHeader, ModalContent, ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import {BiLogIn, BiLogOut, BiCart, BiHistory} from 'react-icons/bi'
import { message, Tooltip } from 'antd'
import 'antd/dist/reset.css';
import AuthContext from '../context/AuthProvider'


export default function Nav() {
    const [authenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [user, setUser] = useState([])
    const options = ['Show', 'Hide', 'Center'];
    const [arrow, setArrow] = useState('Show');
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
    
    //const {user, setUser} = useContext(AuthContext);

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
    //const analytics = getAnalytics(app);
    const auth = getAuth(app);

    useEffect(() => {
      onAuthStateChanged(auth, (user1 => { 

        //console.log(user1)

        if(user1 != null){
          setIsAuthenticated(true)
        }
        setUser(user1);
          try{
          window.localStorage.setItem('uid', user1.uid)
        }catch(err){
          console.log(err)
        }
      }))
    }, [user])

    const {isOpen:isAddLoginOpen, onOpen:onAddLoginOpen, onClose:onAddLoginClose} = useDisclosure()

    const registerClicked = async () => {
        //console.log(password)
        const res = await createUserWithEmailAndPassword(auth, email, password).then((res) => {
          message.success("Account Created")
        }).catch((err) => {
          message.error("Registration Failed")
        })
        //console.log(res)
        onAddLoginClose();
      }
    
      const signInClicked = async () => {
        //console.log(email)
        const res = await signInWithEmailAndPassword(auth, email, password).then((res) => {
          console.log(res)
          window.localStorage.setItem('uid', res.user.uid)
          message.success("Welcome!")
          setIsAuthenticated(true)
        }).catch((err) => {
          message.error("Login Failed. Please Confirm Credentials")
        })
        //console.log(res);
        onAddLoginClose();
      }

    const signOutUser = async () => {
      await signOut(auth).then((res) => {
          message.success("Goodbye!")
          setIsAuthenticated(false)
          window.localStorage.setItem('uid', null)
      }).catch((err) => {
          message.error("Unknown error!")
      })
    }

    const handleCart = () => {
      console.log(user)

      if(user == null){
        message.info("Login to Continue")
        onAddLoginOpen()
      }else{
        router.push("/cart")
      }
    }

    const handleOrders = () => {
      if(user == null){
        message.info("Login to Continue")
        onAddLoginOpen()
      }else{
        router.push("/orders")
      }
    }

  return (
    <div class='w-full h-12 bg-gray-400 flex flex-row flex items-center'>
        <div class='w-1/3 flex p-2 flex justify-center'>
            <p onClick={() => router.push('/')} class='text-xs md:text-2xl text-blue-600 font-semibold cursor-pointer'>MARTIN WANJIA STORE</p>
        </div>
        <div class='w-2/3 flex flex-row justify-end p-2'>
            <div class='flex justify-between w-1/4'>
                {/*<p onClick={() => router.push('/cart')} class='cursor-pointer font-semibold'>CART</p>*/}
                <Tooltip color={'gray'} placement='bottomRight' title="CART" arrow={mergedArrow}>{<BiCart class='cursor-pointer' size={30} onClick={handleCart} />}</Tooltip>
                {/*<p onClick={() => router.push('/orders')} class='cursor-pointer font-semibold'>ORDERS</p>*/}
                {/*<Tooltip color={'gray'} placement='bottomRight' title="ORDERS" arrow={mergedArrow}>{<BiHistory class='cursor-pointer' size={30} onClick={handleOrders} />}</Tooltip>*/}
                {/*authenticated && <p class='cursor-pointer font-semibold'>SIGNOUT</p>*/}
                {authenticated && <Tooltip color={'gray'} placement='bottomRight' title="SIGNOUT" arrow={mergedArrow}><BiLogOut class='cursor-pointer' onClick={signOutUser} size={30}/></Tooltip>}
                {/*!authenticated && <p onClick={onAddLoginOpen} class='cursor-pointer font-semibold'>SIGNIN</p>*/}
                {!authenticated && <Tooltip color={'gray'} placement='bottomRight' title="LOGIN" arrow={mergedArrow}><BiLogIn class='cursor-pointer' size={30} onClick={onAddLoginOpen}/></Tooltip>}
            </div>
        </div>
        <Modal  isOpen={isAddLoginOpen} onClose={onAddLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login/SignUp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div class='flex flex-col w-full'>
            <div class="w-full ">
            <form class="bg-white rounded px-8 pt-6 pb-8 w-full mb-4 space-y-4">
              <div class="w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Email Address
                </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
              </div>
              <div class="w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
              </div>
              <div class="flex items-center justify-between">
                <button onClick={signInClicked} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Sign In
                </button>
                <button onClick={registerClicked} class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Register
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </a>
              </div>
              <div class='flex flex-col'>
                <button class="bg-white-700 hover:bg-blue-700 text-black border-2 border-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button">
                  Sign In With Google
                </button>
              </div>
            </form>
          </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
