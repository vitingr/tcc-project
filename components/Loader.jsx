import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='loader-container'>
        <Image src="/assets/images/loader.svg" width={500} height={500} alt='loader' className='loading' />
    </div>
  )
}

export default Loader