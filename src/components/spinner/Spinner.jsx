import React from 'react'
import "./spinner.css"
const Spinner = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[60vh]'>
            <div className="half-circle-spinner">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
        </div>
    )
}

export default Spinner
