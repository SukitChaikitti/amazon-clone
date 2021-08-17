import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import Checkoutproduct from './Checkoutproduct';
import {useStateValue} from './StateProvider';

function Checkout() {

    const [{basket , user} , dispatch] = useStateValue();

    return (
        <div className = 'checkout'>
            <div className = 'checkout__left'>
                <img className = 'checkout__ad' src = 'https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'></img>
                <div className = 'checkout__basket'>
                    <h3>Hello , {user?.email}</h3>
                    <h2 className = 'checkout__title'>Your shopping Basket</h2>
                    {basket?.map((product) => (
                        <Checkoutproduct id = {product.id} image = {product.image} price = {product.price} rating = {product.rating} title = {product.title}/>
                    ))}
                </div>
            </div>
            <div className = 'checkout__right'>
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
