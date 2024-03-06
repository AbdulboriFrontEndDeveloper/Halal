import React, { useContext } from 'react'
import ScaleCarausel from '../components/ScaleCarausel'
import { productsContext } from '../App'

const Scale = () => {
    const character = ["Weight", "Quantity", "Meat type", "Species", "Expiration date", "TU", "Shell container", "Packaging", "Curing temprature"]
    const [state, _] = useContext(productsContext)
    
    return (
        <div className='min-h-screen mt-5'>
            {
                state.scale.length ?
                (
                    <div className="grid grid-cols-3 lg:grid-cols-4">
                    <div className="col-span-1 sm:ps-3">
                        <div className="h-[560px]"></div>
                        <div className="mt-1 border-t">
                            {
                                character?.map((item, i) => {
                                    return (
                                        <div key={i} className="border-b text-xs h-[40px] md:text-base overflow-hidden sm:font-semibold sm:ps-3 even:bg-gray-200 odd:bg-white odd:border-e p-2">
                                            {item}:
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-3">
                            <ScaleCarausel/>
                    </div>
                </div>
                )
                : <p className='min-h-[500px] ps-10'>No items...</p>
            }
         

        </div>
    )
}

export default Scale
