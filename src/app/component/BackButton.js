"use client";
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();

    function goBack(){
router.back();
    }
  return (
  <button onClick={goBack}
   className='inline-flex items-center gap-2 text-gray-700 mb-4 cursor-pointer'>
    <FaArrowLeft/>
    Back
  </button>
  )
}

export default BackButton
