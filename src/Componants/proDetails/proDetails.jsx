import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import LoadingScreen from '../LoaadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';
import { cartcontext } from '../../Conttext/CartContextProvider';
import $ from 'jquery';
export default function ProDetails() {
    const { addProuductToCart, deleteItem } = useContext(cartcontext)
    const { id } = useParams()


    async function addmyproduct(id) {
        if (await addProuductToCart(id) == true) {
            $('.succssMsg').fadeIn(1000, function () {
                setTimeout(() => {
                    $('.succssMsg').fadeOut(1000)
                }, 2000)
            })
            $('.delbtn').fadeIn(500)
            $('#addbtn').fadeOut(500)
        };


    }


    async function removemyproduct(id) {
       if (await deleteItem(id) == true) {
            $('.removeMsg').fadeIn(1000, function () {
                setTimeout(() => {
                    $('.removeMsg').fadeOut(1000)
                }, 2000)
            })
            $('#addbtn').fadeIn(500)
            $('.delbtn').fadeOut(500)
        }
    }

    const [prouductdetails, setprouductdetails] = useState(null)
    async function getProDetails() {

        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            setprouductdetails(data.data)
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(function () {
        getProDetails()
    }, [])
    return <>
        {prouductdetails ? <div className="container">
            <div className="row">


                <div className="col-md-3" >
                    <img src={prouductdetails.imageCover} className='w-100' alt="" />
                </div>
                <div className="col-md-9">
                    <h2>{prouductdetails.title}</h2>
                    <p>{prouductdetails.description}</p>
                    <h5>Price:{prouductdetails.price}</h5>
                    <h5>Quantity:{prouductdetails.quantity}</h5>
                    <button id='addbtn' onClick={function () { addmyproduct(prouductdetails.id) }} className='btn btn-success w-100'> add to cart +</button>
                    <button onClick={function () {
                        removemyproduct(prouductdetails.id)}} style={{ 'display': "none" }} className='btn btn-danger delbtn w-100'> remove from cart -</button>
                    <div style={{ 'display': "none" }} className="alert alert-success text-center succssMsg">
                        proudect added successfully....
                    </div>
                    <div style={{ 'display': "none" }} className="alert alert-danger text-center removeMsg">
                        proudect removed successfully....
                    </div>
                </div>





            </div>
        </div> : <LoadingScreen />}

    </>
}
