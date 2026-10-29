import React from 'react'
import Spinner from './component/Spinner'

function loading() {
  return (
    <div className="py-20 flex  items-center justify-center">
      <Spinner />
    </div>
  )
}

export default loading
