import React from 'react'
import ProductBanner from '../component/ProductBanner'
function ProductsLayout({ children }) {
  return (
    <>
       <ProductBanner/>
   {children}
    </>

  )
}

export default ProductsLayout
