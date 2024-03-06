import React from 'react'
import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const ReactSceleton = ({ card }) => {



    return (
        Array(card).fill(0).map((_, i) => {
            return (
                <div key={i} className='rounded-md shadow flex flex-col'>
                    <div className="cursor-pointer">
                        <div className="w-full h-full aspect-square object-cover">
                            <Skeleton className='w-full h-full' />
                        </div>
                    </div>
                    <div className="sm:p-3 p-1 flex flex-col gap-1 flex-1">
                        <div className="mb-3 gap-1 sm:gap-2 flex flex-col">
                            <div className="h-4 sm:h-6">
                                <Skeleton className='w-full h-full' />
                            </div>
                            <div className="w-[90%] h-2 sm:h-3 ">
                                <Skeleton className='w-full h-full' />
                            </div>
                            <div className="w-[80%] h-2 sm:h-3 ">
                                <Skeleton className='w-full h-full' />
                            </div>
                            <div className="w-[75%] h-2 sm:h-3 ">
                                <Skeleton className='w-full h-full' />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row border mt-auto gap-2 p-1 sm:p-3">
                        <div className="flex-1">
                            <Skeleton className='w-full h-full p-[5px]  rounded-md' />
                        </div>
                        <div className="flex sm:gap-2 gap-1">
                            <div className="flex-1">
                                <Skeleton className='w-full h-full sm:w-10 sm:h-10 sm:p-4 rounded-md' />
                            </div>
                            <div className="flex-1">
                                <Skeleton className='w-full h-full sm:w-10 sm:h-10 sm:p-4 rounded-md ' />
                            </div>

                        </div>
                    </div>

                </div>

            )
        })
    )
}

export default ReactSceleton
