import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { instance } from '../API/API';
import Skeleton from 'react-loading-skeleton';

 const HomeSlider = () => {
    // const [_,dispatch] = useContext(productsContext)
    const [isfetching, setIsfetching] = useState(true)
    const [dataSlider, setDataSlider] = useState()
    const fetchSlider = async () => {
        // dispatch({type: "LOADING", payload: true })
        setIsfetching(true)
        try {
            const data = await instance.get('slider')
            // console.log(data);
            setDataSlider(data.data)
            setIsfetching(false)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSlider()
    }, [])
    // console.log(dataSlider);
    return (
        <div>
            <>
                {
                    isfetching ? 
                    <Skeleton className='h-[250px] sm:h-[350px]  md:h-[500px] w-full mb-4 rounded-xl' />
                    : 
                dataSlider &&
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Pagination, Autoplay, Navigation]}
                        className="mySwiper"
                    >
                        {
                            dataSlider.length ?
                                dataSlider.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={item?.image} alt="" className='h-[250px] sm:h-[350px] md:h-[500px] rounded-xl  object-cover object-center w-full' />
                                        </SwiperSlide>
                                    )
                                })
                                : ''
                        }

                    </Swiper>
                }
            </>
        </div>
    )
}

export default HomeSlider
