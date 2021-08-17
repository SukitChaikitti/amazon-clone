import React from 'react';
import './Checkoutproduct.css';
import {useStateValue} from './StateProvider';

function Checkoutproduct({id , title , price , rating , image , hideButton}) {

    const [{basket} , dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_BASKET',
            id: id,
        })
    };

    return (
        <div className = 'checkoutproduct'>
            <img className = 'checkoutproduct__image' src = {image}/>
            <div className = 'checkoutproduct__info'>
                <p className = 'checkoutproduct__title'>{title}</p>
                <strong className = 'checkoutproduct__price'>$ {price}</strong>
                <div className = 'checkoutproduct__rating'>
                    {Array(rating).fill().map((_,i) => (
                        <p>🎇</p>
                    ))}
                </div>
                {!hideButton &&
                <button onClick = {removeFromBasket}>Remove from basket</button>}
            </div>
        </div>
    )
}

export default Checkoutproduct
