import React, { Children } from 'react'

const HeadingTage = ({firstText,secondText}) => {
  return (
    <div>
        
        <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-4'>{firstText} <span className='text-emerald-400'>{secondText}</span></h1>
        </div>
  )
}

export default HeadingTage