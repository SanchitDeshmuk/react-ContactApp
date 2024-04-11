import React from 'react'
import { useState } from 'react'

const useDisclouse = () => {

  const[contacts,setContacts] = useState([])
  const [isOpen,setIsOpen] = useState(false)

  const onOpen = ()=>{
    setIsOpen(true)
  }

  const onClose = ()=>{
    setIsOpen(false)
  }

  return {onOpen ,onClose,isOpen}
}

export default useDisclouse