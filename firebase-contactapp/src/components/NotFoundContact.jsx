import React from 'react'

const NotFoundContact = () => {
  return (
    <div className='flex justify-center items-center gap-4'>
        <img src="noContact.png" alt="logo"/>
        <h3 className='text-white text-2xl font-semibold'>Contact Not Found</h3>
    </div>
  )
}

export default NotFoundContact