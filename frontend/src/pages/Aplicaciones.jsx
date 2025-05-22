import React from 'react'
import AplicacionStudent from '../components/AplicacionStudent'

export default function Aplicaciones() {
  return (
    <>
    <div className='grid text-center justify-start'>
        <h1 className='text-black font-bold text-4xl ml-32 mt-4'>Tus aplicaciones</h1>
      
    </div>
     <div className='lg:ml-24 justify-start grid mt-8 mx-4'>
            <AplicacionStudent/>
            <AplicacionStudent/>
            <AplicacionStudent/>
        </div>
    </>
  )
}
