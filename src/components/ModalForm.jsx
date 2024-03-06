import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { instance } from '../API/API';
import { toast } from 'react-toastify';
import SpinnerSmall from './spinnerSmall/SpinnerSmall';
import { VscCheckAll } from "react-icons/vsc";
import { BiError } from "react-icons/bi";


const initialValue = {
    name: '',
    number: '',
    message: '',
}
const ModalForm = ({ setShowModal }) => {
    const [dataForm, setDataForm] = useState(initialValue)
    const [spin, setspin] = useState(false)
    const [status, setStatus] = useState(null)

    
    const inputHandler = (name, value) => {
        setDataForm({ ...dataForm, [name]: value })
    }

    const sendDataForm = async (e) => {
        setspin(true)
        e.preventDefault()
        try {
            const resp = await instance.post("/support/", dataForm, {
                headers: { "Content-type": "application/json" },
            })
            toast.success('Success')
            console.log(resp);
            setspin(true)
            setStatus(true)
        } catch (error) {
            console.log(error);
            setStatus(false)
            toast.error('error')
            setspin(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus(null)
        }, 4000);
        return ()=> clearInterval(timer)
    }, [status])
    

    return (
        <div className='bg-black/60 backdrop-blur-md w-full h-screen p-1 sm:p-3 flex items-center justify-center top-0 left-0 z-10 fixed'>
            <div className="relative w-[500px] h-auto border p-6 bg-white rounded ">
                <div className="my-4">
                    <div className="flex flex-col gap-2">
                        <h1 className='text-black text-lg font-medium'>Contact to Admin</h1>
                        <div className="ms-auto me-5 ">
                            {spin ? <SpinnerSmall /> : null}
                            <div className="flex gap-3 items-center">
                                {
                                    status ? (
                                        <>
                                            <VscCheckAll className='text-green-500 w-5 h-5' />
                                            <h3>success</h3>
                                        </>
                                    ) : status === false ? (
                                        <>
                                            <BiError className='text-red-500 w-5 h-5' />
                                            <h3>error</h3>
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowModal(false)} className='bg-transparent text-black border-none absolute top-3 right-3'><IoIosCloseCircleOutline className='w5 h-5' /></button>
                </div>
                <div className="flex flex-col gap-4">
                    <input onChange={(e) => inputHandler(e.target.name, e.target.value)} name='name' type="text" className='p-3 text-sm text-black ' placeholder='First Name' />
                    <input onChange={(e) => inputHandler(e.target.name, e.target.value)} name='number' type="number" className='p-3 text-sm text-black ' placeholder='Phone Namber' />
                    <textarea onChange={(e) => inputHandler(e.target.name, e.target.value)} name='message' className='p-3 text-sm text-black ' placeholder='Message'></textarea>
                    <button onClick={sendDataForm} disabled={!dataForm.name || !dataForm.number || !dataForm.message ? true : false} className='bg-black disabled:opacity-25 disabled:cursor-not-allowed p-3 text-white rounded-md'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ModalForm