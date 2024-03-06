import { toast } from "react-toastify";
import { instance } from "../API/API";


export const fetchAllProducts = async ({dispatch, filter, search})=> {
    dispatch({type: 'LOADING'})
    try {
        let resp;
        if(filter) {
            resp = await instance.get(`/products?category_slug=${filter}`)
        }
        else if (search) {
            resp = await instance.get(`/products?search=${search}`)
        }
        else {
            resp = await instance.get("products")
        } 
        dispatch({type:"PRODUCT_LIST", payload:resp?.data})
    } catch (error) {
        console.log(error);
        toast.error('Qandaydir xatolik yuz berdi')
    }
}

export const fetchAllCategory = async ({dispatch})=> {
    dispatch({type:"LOADING" })
    try {
        const resp = await instance.get("/category")
        let newDate = [{name: 'all', slug: "all"}, ...resp?.data]
        // console.log(newDate);
        dispatch({type:"CATEGORY_LIST", payload:newDate})
    } catch (error) {
        console.log(error);
        toast.error('Qandaydir xatolik yuz berdi')
    }
}

export const DetailFunc = async (slug, dispatch)=> {
    dispatch({type:"LOADING" })
    try {
        const resp = await instance.get(`/products?product_slug=${slug}`)
        
        // console.log(newDate);
        dispatch({type:"FETCH_DETAIL", payload:resp?.data})
        // console.log(resp.data);
    } catch (error) {
        console.log(error);
        toast.error('Qandaydir xatolik yuz berdi')
    }  
}

export const fetchContact = async (dispatch)=> {
    dispatch({type:"LOADING" })
    try {
        const resp = await instance.get(`/contact`)
        
        // console.log(newDate);
        dispatch({type:"CONTACT", payload:resp?.data})
        // console.log(resp.data);
    } catch (error) {
        console.log(error);
        toast.error('Qandaydir xatolik yuz berdi')
    }  
}

export const fetchDiscount = async (dispatch)=> {
    dispatch({type:"LOADING" })
    try {
        const resp = await instance.get(`/products?discount=1`)
        dispatch({type:"DISCOUNT", payload:resp?.data})
        // console.log(resp.data);
    } catch (error) {
        console.log(error);

        toast.error('Qandaydir xatolik yuz berdi')
    }  
}