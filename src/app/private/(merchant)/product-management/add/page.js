import React from 'react'
import ProductForm from '../_components/form'
import BackButton from '@/app/component/BackButton'

const addPage = () => {
  return (
<section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <BackButton/>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
  <ProductForm/>
  </div>
</section>

  )
}

export default addPage
