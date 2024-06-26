import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { IoSearch } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import {collection,onSnapshot} from 'firebase/firestore'
import {db} from './config/firebase'
import ContactCard from './components/ContactCard'
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

function App() {
  const[contacts,setContacts] = useState([])
  const {isOpen , onClose,onOpen} = useDisclouse()

  useEffect(()=>{
    const getContacts = async () =>{
      try {
        const contactsRef = collection(db,"contacts")
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactLists)
          return contactLists
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  },[])

  const filterContacts = (e)=>{
    const value = e.target.value

    const contactsRef = collection(db,"contacts")
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data(),
            }
          })

          const filteredContacts = contactLists.filter(contact =>contact.name.toLowerCase().includes(value.toLowerCase()))

          setContacts(filteredContacts)

          return filteredContacts
        })
  }

  return (
    <>
    <div className='max-w-[370px] mx-auto px-4'>
      <Navbar/>
      <div className='flex gap-2'>
      <div className='relatice flex items-center flex-grow'>
      <IoSearch className='ml-1 absolute text-white text-3xl'/>
        <input onChange={filterContacts} type="text" className='pl-10 text-white flex-grow rounded-md border h-10 border-white bg-transparent' />
      </div>
      <div>
      <FaCirclePlus onClick={onOpen} className='text-5xl text-white cursor-pointer'/>
      </div>
      </div>
      <div>
        <div className='mt-4 gap-3 flex flex-col '>
          {contacts.length <= 0 ? <NotFoundContact/> :  contacts.map((contact)=>(
            <ContactCard key={contact.id} contact={contact}/>
          ))}
        </div>
      </div>
    </div>
    <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
    <ToastContainer />
    </>
  )
}

export default App
