import React from 'react'
import { HiOutlineBars3 } from "react-icons/hi2";
import { useSearchParams } from 'react-router-dom';


const DropCategory = ({ category, dropRef, inputRef  }) => {

  const [_, setParam] = useSearchParams()

  const selectHandler = (e) => {
    inputRef.current.value = ''
    if (e.target.value === 'all') {
      setParam({})
    }
    else {
      setParam({filter: `${e.target.value}`})
    }
  }

  // console.log(category);
  return (
    <div className='flex items-center justify-center text-white'>
      <span><HiOutlineBars3 className='w-6 h-6' /></span>
      <select ref={dropRef} onChange={selectHandler} className='rounded-md py-2 text-sm px-3 w-full border-none text-white capitalize'>
        {category?.map((item, i) => {
          return (
            <option key={i} className='w-full text-black ' value={item.slug}>{item.name}</option>
          )
        })}
      </select>
    </div>
  )
}

export default DropCategory
