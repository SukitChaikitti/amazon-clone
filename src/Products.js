import React from 'react';
import './Products.css';
import {useStateValue} from './StateProvider';

function Products({id , title , price , rating , image}) {

    const [state , dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_BASKET',
            item: {
                id : id,
                title : title,
                price : price,
                rating : rating,
                image : image,
            }
        })
    }

    return (
        <div className = 'product'>
            <div className = 'product__info'>
                <p>{title}</p>
                <p className = 'product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className = 'product__rating'>
                    {Array(rating).fill().map((_ , i) => {
                        return<p>🎇</p>
                    })}
                </div>
                
            </div>
            <img className = 'product__image' src = {image}/>
            <button className = 'product__button' onClick = {addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Products
