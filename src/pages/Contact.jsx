import React, { useContext, useState } from 'react'
import { productsContext } from '../App'
import { instance } from '../API/API';
import { toast } from 'react-toastify';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import parse from 'html-react-parser';
import SpinnerSmall from '../components/spinnerSmall/SpinnerSmall';


const initialValue = {
  name: '',
  email: '',
  message: '',
}


const Contact = () => {
  const [state, _] = useContext(productsContext)
  // console.log(state.contact);
  const [dataForm, setDataForm] = useState(initialValue)
  const [spin, setSpin] = useState(false)
  const [status, setStatus] = useState(null)

  // const inputHandler = (e) => {
  //   const key = e.target.value
  //   setDataForm({ ...dataForm, [key]: e.target.value })
  // }

  
  const inputHandler = (name, value) => {
    setDataForm({ ...dataForm, [name]: value })
}

  const sendDataForm = async (e) => {
    setSpin(true)
    e.preventDefault()
    try {
      const resp = await instance.post("/support/", dataForm, {
        headers: { "Content-Type": "application/json" },
      })
      console.log(resp);
      toast.success("Success")
      setSpin(true)
      setStatus(true)
      setDataForm(initialValue)
      // console.log(resp);

    } catch (error) {
      toast.error("Error")
      console.log(error);
      setSpin(false)
      setStatus(false)
    }
  }

  return (
    <div className='min-h-screen w-full '>
      <div className="main-container mt-10 grid grid-cols-1 gap-7 lg:grid-cols-2">
        <div className="col-span-1 flex flex-col gap-3 border">
          <h1 className='text-xl font-bold mb-3 '>Namangan city, Afsona park</h1>
          <h1>Phone: <a href={`tel:${state.contact[0]?.phone_number}`}>{state.contact[0]?.phone_number}</a></h1>
          <h1>Email: <span>{state.contact[0]?.email}</span></h1>
        </div>
        <div className="col-span-1 p-3 border ">
          <div className="flex flex-col sm:flex-row">
            <h1 className="text-xl font-bold mb-3">Contact detail</h1>
            <div className="ms-auto me-5">
              {spin ? <SpinnerSmall /> : null}
              <div className="flex gap-3 items-center">
                {
                  status ? (
                    <>
                      <IoCheckmarkDoneOutline className='text-green-500 w-5 h-5' />
                      <h3>Success</h3>
                    </>
                  ) : status === false ?
                    (
                      <>
                        <MdErrorOutline className='text-red-500 w-5 h-5' />
                        <h3>Error</h3>
                      </>
                    ) : null

                }
              </div>
            </div>
          </div>

          <form onSubmit={sendDataForm} className='flex flex-col gap-4'>
            <input onChange={(e) => inputHandler(e.target.name, e.target.value)} value={dataForm.name} type="text" name='name' className='p-3 text-sm' placeholder='*Username...' />
            <input onChange={(e) => inputHandler(e.target.name, e.target.value)} value={dataForm.email} type="email" name='email' className='p-3 text-sm' placeholder='*Email...' />
            <textarea onChange={(e) => inputHandler(e.target.name, e.target.value)} value={dataForm.message} name="message" className='p-3 text-sm' placeholder='Message' ></textarea>
            <button disabled={!dataForm.name || !dataForm.email || !dataForm.message ? true : false} className='bg-black p-3 disabled:opacity-25 disabled:cursor-not-allowed text-white rounded-md'>Submit</button>
          </form>

        </div>
        <div className="lg:col-span-2 p-3 border">
          {
            parse(state?.contact[0] ? state.contact[0]?.location : '')
          }
        </div>

      </div>
    </div>
  )
}

export default Contact