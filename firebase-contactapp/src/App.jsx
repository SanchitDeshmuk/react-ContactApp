import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { IoSearch } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import {collection,getDocs} from 'firebase/firestore'
import {db} from './config/firebase'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {IoMdTrash} from 'react-icons/io'
import {RiEditCircleLine} from 'react-icons/ri'
import ContactCard from './components/ContactCard'
import Modal from './components/Modal';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse'

function App() {
  const[contacts,setContacts] = useState([])
  const {isOpen , onClose,onOpen} = useDisclouse()

  useEffect(()=>{
    const getContacts = async () =>{
      try {

        const contactsRef = collection(db,"contacts")
        const contactsSnapshot = await getDocs(contactsRef)
        const contactLists = contactsSnapshot.docs.map((doc)=>{
          return{
            id:doc.id,
            ...doc.data(),
          }
        })
        setContacts(contactLists)
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  },[])

  return (
    <>
    <div className='max-w-[370px] mx-auto px-4'>
      <Navbar/>
      <div className='flex gap-2'>
      <div className='relatice flex items-center flex-grow'>
      <IoSearch className='ml-1 absolute text-white text-3xl'/>
        <input type="text" className='pl-10 text-white flex-grow rounded-md border h-10 border-white bg-transparent' />
      </div>
      <div>
      <FaCirclePlus onClick={onOpen} className='text-5xl text-white cursor-pointer'/>
      </div>
      </div>
      <div>
        <div className='mt-4 gap-3 flex flex-col '>
          {contacts.map((contact)=>(
            <ContactCard key={contact.id} contact={contact}/>
          ))}
        </div>
      </div>
    </div>
    <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default App
