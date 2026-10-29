import Link from 'next/link'

import { HOME_ROUTE } from '../constants/routes'

function Logo() {
  return (
    <div>
          <Link href={HOME_ROUTE} className="flex items-center space-x-3 rtl:space-x-reverse">
      
      <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">ELectro <span className='text-primary'>Shop</span>

      </span>
    </Link>
    </div>
  )
}

export default Logo
