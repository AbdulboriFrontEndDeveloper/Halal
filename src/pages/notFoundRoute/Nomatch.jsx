import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import animate from './animate404.json'
const Nomatch = () => {
    return (
        <div className='main-container py-32\'>
            <Player
                autoplay 
                loop
                src={animate}
                className='w-full sm:w-[80%] md:w-[65%]'
            >
            </Player>
        </div>
    )
}

export default Nomatch
