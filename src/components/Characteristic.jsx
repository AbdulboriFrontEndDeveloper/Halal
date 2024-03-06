import React from 'react'
import { HiMinus } from "react-icons/hi2";


const Characteristic = ({itemDate}) => {


    const character = ['Вага', 'Штук', 'Тип м’яса', 'Гатунок', 'Термін придатності', 'ТУ', 'Оболонка/тара', 'Пакування', 'Температура зберігання']
    // console.log(Object.keys(itemDate.characteristic));
    console.log();
  return (
    <>
      {
        character.map((charact, i) =>{
            return(
                <div key={i} className='border-b text-xs sm:text-base h-[40px] p-2 even:bg-gray-200 odd:bg-white odd:border-s'>
                    {
                        itemDate.characteristic[character[i]] ?
                        itemDate.characteristic[character[i]] : <HiMinus />

                        
                    }
                </div>
            )
        }) 
      }
    </>
  )
}

export default Characteristic
